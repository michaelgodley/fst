var fs =require('fs');
var util = require('util');
var xml2js = require('xml2js');
var Joi = require('joi');

var parser = new xml2js.Parser({
    attrkey: 'attr',
    trim: true,
    normalizeTags: false,
    normalize: false,
    explicitRoot: true,
    emptyTag: '',
    explicitArray: false,
});

const file = __dirname + '/../../xml/event032.xml';
console.log(file);

fs.readFile(file, function(err, data) {
    parser.parseString(data, function (err, result) {
        const hdr = parseResultHeader(result.root.Race);
        console.log(hdr);
        parseResultHeats(result.root.Race.Heat);
        //console.log(util.inspect(result.root.Race.Heat, false, null));
    });
});

const resultHeaderParamsSchema = Joi.object().keys({
    Code: Joi.string().regex(/\bEvent...\b/).required(),
    Classification: Joi.string().required(),
    Title: Joi.string().required(),
    DateSched: Joi.string().required(),
    TimeSched: Joi.string().required(),
    TimeOff: Joi.string().required(),
    WR: Joi.string().required(),
    Type: Joi.string().valid(['Run', 'HorFE']),
    PrevAthlete: Joi.number().optional(),
});

function parseResultHeader({
    Code, 
    Classification, 
    Title, 
    DateSched, 
    TimeSched, 
    TimeOff, 
    WR, 
    Type,
    PrevAthlete,
    ...rest} = {}) {
    // Validate inputs
    const result = Joi.validate({ Code, Classification, Title, DateSched, TimeSched, TimeOff, WR, Type, PrevAthlete, }
        , resultHeaderParamsSchema, { allowUnknown: false, abortEarly: false, stripUnknown: false }, 
        (error, value) => { return { error, value }; });

    if(result.error) {
        console.log(result.error);
    } 

    const code = parseHeaderCode(Code);
    const title = parseHeaderTitle(Title);
    if(title.ageCategory != Classification) {
        console.log(title.ageCategory, Classification);
    }
    const dates = parseHeaderDate(DateSched, TimeSched, TimeOff);

    const header = {
        event: code,
        ageCategory: Classification,
        eventTitle: title,
        eventTimeData: dates,
        gender: title.gender,
        record: WR,
        eventType: Type,
    };
    //parseResultHeats(rest.Heat);
    return header;
}

function parseResultHeats(heats) {
    if(Array.isArray(heats)) {
        heats.forEach(heat => { 
            parseResultHeat(heat);
        }); 
    } else {
        parseResultHeat(heats);        
    }

}

function parseResultHeat({attr, Status, RaceWind, ...rest} = {}) {
    console.log(Status, attr.number);
    //console.log(rest.Athlete);
    parseResultAthletes(rest.Athlete)
}

function parseResultAthletes(athletes) {
    if(Array.isArray(athletes)) {
        athletes.forEach(athlete => { 
            parseResultAthlete(athlete);
        }); 
    } else {
        parseResultAthlete(athletes);        
    }
}

const athleteResultSchema = Joi.object().keys({
    Lane: Joi.number().required(),
    Bib: Joi.number().required(),
    PartCode: Joi.number().default(0),
    SortOrder: Joi.number().required(),
    Rank: Joi.number().required(),
    Category: Joi.string().empty(''),
    AthleteID: Joi.number().required(),
    Surname: Joi.string().empty(''),
    Name: Joi.string().empty(''),
    DisplayName: Joi.string().empty(''),
    TVName: Joi.string().empty(''),
    Pbest: Joi.string().empty(''),
    Sbest: Joi.string().empty(''),
    IAAFPnts: Joi.number().integer().min(0),
    CEPnts: Joi.number(),
    TEAMPnts: Joi.number(),
    Country:  Joi.string().empty('').optional(),
    Team: Joi.string().empty(''),
    QualificationMark: Joi.string().empty(''),
    PB:  Joi.string().empty(''),
    Time:  Joi.string().empty(''),
    TimingType: Joi.string().valid(['E', 'M']),
    Records: Joi.string().empty(''),
    TimeBehindLeader: Joi.string().empty(''),
    Result: Joi.string().optional().empty(''),
});

function parseResultAthlete({
    Lane,
    Bib, 
    PartCode,
    SortOrder,
    Rank,
    Category,
    AthleteID,
    Surname,
    Name,
    DisplayName,
    TVName,
    Pbest,
    Sbest,
    IAAFpnts,
    CEpnts,
    TEAMpnts,
    Country,
    Team,
    QualificationMark,
    PB,
    Time,
    TimingType,
    Records,
    TimeBehindLeader,
    Result,
    ...rest
    } = {}) {
    const result = Joi.validate({ Lane, Bib, PartCode, SortOrder, Rank, Category, AthleteID, Surname, Name, 
        DisplayName, TVName, Pbest, Sbest, IAAFpnts, CEpnts, TEAMpnts, Country, Team, QualificationMark, PB,
        Time, TimingType, Records, TimeBehindLeader, Result }
        , athleteResultSchema, { allowUnknown: false, abortEarly: false, stripUnknown: false }, 
        (error, value) => { return { error, value }; });

    console.log(PartCode, Country);
    if(result.error) {
        //console.log(result.error);
    } 
}

function parseHeaderTitle(title, separator = ' ') {
    const tokens = title.split(separator);
    const l = tokens.length;
    // Gender is last token
    const gen = tokens[l-1];
    let gender;
    if(gen.match(/\bBoys|Men\b/)) {
        gender = 'M';
    } else if(gen.regex(/\bGirls|Women\b/)) {
        gender = 'F';
    }   

    // Age category is 2nd last token
    const ageCategory = tokens[l-2];

    return {
        payload: title,
        gender,
        ageCategory,
    };
}

function parseHeaderCode(code) {
    // Extract event ID from last 3 characters
    const id = parseInt(code.substring(5));
    return {
        payload: code,
        eventId: id, 
    };
}

function parseHeaderDate(date, scheduleTime, actualTime, dseparator = '/', tseparator = ':') {
    const datetokens = date.split(dseparator);
    const l = datetokens.length;
    const d = new Date(datetokens[l-1], datetokens[l-2], datetokens[l-3]);
    const stimetokens = scheduleTime.split(tseparator);
    const st = new Date(datetokens[l-1], datetokens[l-2], datetokens[l-3], stimetokens[l-3], stimetokens[l-2], stimetokens[l-1]);
    const atimetokens = actualTime.split(tseparator);
    const at = new Date(datetokens[l-1], datetokens[l-2], datetokens[l-3],  atimetokens[l-3], atimetokens[l-2], atimetokens[l-1]);
    
    return {
        event: {
            payload: date,
            eventDate: d,
        },
        projectedTime: {
            payload: scheduleTime,
            scheduledTime: st,
        },
        actualTime: {
            payload: actualTime,
            eventTime: at,
        },
    };
}

