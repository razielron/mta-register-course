const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () { return $('#R1C1') }
    get inputPassword () { return $('#R1C2') }
    get btnSubmit () { return $('#loginbtn') }
    get registrationDropdown () { return $('#navBar').$$('li')[0] }
    get registration () { return $$('li[class="dropdown-item"]')[0].$('a') }
    get frameRadio () { return $('#searchType5') }
    get frameDropdown () { return $('#select2-R1C4-container') }
    get frameSearch () { return $('input[aria-controls="select2-R1C4-results"]') }
    get frameOptions () { return $('#select2-R1C4-results') }
    get searchBtn () { return $('#searchButton') }
    get searchInput () { return $('input[type="search"]') }
    get openCourse () { return $('input[name="B2"]') }
    get registerCourseBtns () { return $$('a[class="btn btn-md u-btn-primary rounded g-mb-12"]') }
    get infoCourseBtns () { return $$('a[class="btn btn-md u-btn-primary rounded g-mb-12  btn btn-md u-btn-primary rounded g-mb-12-light-green"]') }
    get pageTitle () { return $('h1[class="pagetitle"]') }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    login (username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.click();
        this.inputPassword.setValue(password);
        browser.pause(500);
        this.btnSubmit.click();
    }

    openRegistration() {
        this.registrationDropdown.waitForExist({timeout: 10000});
        this.registrationDropdown.waitForDisplayed({timeout: 10000});
        this.registrationDropdown.moveTo();
        this.registration.waitForDisplayed({timeout: 10000});
        this.registration.click();
    }

    openSearchByMdmhFrame(frameType) {
        this.frameRadio.click();
        this.frameDropdown.click();
        this.frameSearch.setValue(frameType);
        browser.keys('\uE007')
        this.searchBtn.click();
    }

    searchCourse(courseName) {
        this.searchInput.setValue(courseName);
        this.openCourse.click();
    }

    registerCourse(interval, tsCheck) {
        let btns = 0, now = Date.now();
        let isValidTime = tsCheck.some(range => {
            return (now > range[0]) && (now < range[1]);
        });
        while(!btns && isValidTime) {
            browser.refresh();
            expect(this.infoCourseBtns[0].isDisplayed()).toEqual(true);
            btns = this.registerCourseBtns.length;
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ " + btns);
            if(this.registerCourseBtns.length) {
                this.registerCourseBtns[0].scrollIntoView();
                this.registerCourseBtns[0].click();
                console.log("REGISTERED!!!");
                return true;
            }
            browser.pause(interval);
            now = Date.now();
            isValidTime = tsCheck.some(range => {
                return (now > range[0]) && (now < range[1]);
            });
        }
        return false;
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open();
    }
}

module.exports = new LoginPage();
