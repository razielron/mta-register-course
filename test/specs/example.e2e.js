const LoginPage = require('../pageobjects/login.page');
const Creds = require('../../creds');

let courses = [
    "תכנות מונחה עצמים בסביבת דוט-נט ושפת #C",
    "תורת הגרפים",
    "טכנולוגיה אתיקה ומשפט",
    "סדנה בהגנת סייבר",
    "ניהול פרוייקטים",
    "ג'אווה סקריפט בשרת ובדפדפן",
    "מבוא לתקשורת מחשבים"
];
let groups = ['14216902']
let data = {
    username: Creds.username,
    password: Creds.password,
    FrameTypeSearch: "מסגרת קורסי בחירה במדעי המחשב",
    courseName: courses[0],
    groupNum: groups[0],
    refreshInterval: 1000 * 5,
    tsCheck: [
        [],
        []
    ]
}

for(let i = 0; i < courses.length; i++) {
    data.courseName = courses[i];
    data.groupNum = groups[i];

    describe(`Register for ${courses[i]}`, () => {
        it('should login with valid credentials', () => {
            LoginPage.open();
            LoginPage.login(data.username, data.password);
        });

        it('should open register course page', () => {
            LoginPage.openRegistration();
        });

        it('should openSearchByMdmhFrame', () => {
            browser.pause(2000);
            LoginPage.openSearchByMdmhFrame(data.FrameTypeSearch);
        });

        it('should searchCourse', () => {
            LoginPage.searchCourse(data.courseName);
        });

        it('should registerCourse', () => {
            let isRegistered = false;
            while (!isRegistered) {
                LoginPage.registerCourse(data.refreshInterval, data.tsCheck, data.groupNum);
            }
        });
    });
}