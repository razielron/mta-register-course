const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

let courses = ['c', "אתיקה"];
let data = {
    username: '',
    password: '',
    FrameTypeSearch: "מסגרת קורסי בחירה במדעי המחשב",
    courseName: courses[0],
    refreshInterval: 1000 * 5,
    tsCheck: [
        [],
        []
    ]
}

describe('My Login application', () => {
    it('should login with valid credentials', () => {
        LoginPage.open();
        LoginPage.login(data.username, data.password);
    });

    it('should open register course page', () => {
        LoginPage.openRegistration();
    });

    it('should openSearchByMdmhFrame', () => {
        LoginPage.openSearchByMdmhFrame(data.FrameTypeSearch);
    });

    it('should searchCourse', () => {
        LoginPage.searchCourse(data.courseName);
    });

    it('should registerCourse', () => {
        let isRegistered = false;
        while (!isRegistered) {
            LoginPage.registerCourse(data.refreshInterval, data.tsCheck);
        }
    });
});