const LoginPage = require('../pageobjects/login.page');
const Creds = require('../../creds');

let codeCoursesTemp = [
    {
        courseName: "סדנה בהגנת סייבר",
        courseCode: '142201',
        groupCode: '14220101',
    },
    {
        courseName: "טכנולוגיה אתיקה ומשפט",
        courseCode: '142190',
        groupCode: '14219001',
    },
]
let data = {
    username: Creds.username,
    password: Creds.password,
    FrameTypeSearch: "מסגרת קורסי בחירה במדעי המחשב",
    courseName: '',
    courseCode: '',
    groupNum: '',
    refreshInterval: 1000 * 5,
    tsCheck: [
        [],
        []
    ]
}

describe(`Login`, () => {
    it('should login with valid credentials', () => {
        LoginPage.open();
        LoginPage.login(data.username, data.password);
    });
});

for(let i = 0; i < codeCoursesTemp.length; i++) {
    data.courseName = codeCoursesTemp[i].courseName;
    data.courseCode = codeCoursesTemp[i].courseCode;
    data.groupNum = codeCoursesTemp[i].groupCode;

    describe(` - Register for: ${data.courseName}\n - Code: ${data.courseCode}\n - Group: ${data.groupNum}`, () => {
        it('should open register course page', () => {
            LoginPage.openRegistration();
        });

        /* it('should openSearchByMdmhFrame', () => {
            browser.pause(2000);
            LoginPage.openSearchByMdmhFrame(data.FrameTypeSearch);
        }); */

        it('should searchCourse', () => {
            LoginPage.searchCourseByCode(data.courseCode);
        });

        it('should registerCourse', () => {
            LoginPage.registerCourse(data.refreshInterval, data.tsCheck, data.groupNum);
        });
    });
}

describe(`Login`, () => {
    it('should login with valid credentials', () => {
        browser.pause(50000);
    });
});