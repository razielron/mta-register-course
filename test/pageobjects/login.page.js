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
    get searchNameInput () { return $('input[type="search"]') }
    get searchCodeInput () { return $('#SubjectCode') }
    get searchCodeBtn() { return $('#searchButton'); }
    get openCourseFromSearch () { return $('input[name="B2"]') }
    get groupsInfo () { return $$('div[class="col-md-12 Father"]') }
    get registerCourseBtns () { return $$('a[class="btn btn-md u-btn-primary rounded g-mb-12  btn btn-md u-btn-primary rounded g-mb-12-light-green"]')
        .filter(elem => {
            return elem.$('span[class="fas fa-pencil-alt"]').isExisting();
        })
    }
    registerGroupBtn (elem) { return elem.$$('a[class="btn btn-md u-btn-primary rounded g-mb-12  btn btn-md u-btn-primary rounded g-mb-12-light-green"]')
        .filter(elem => {
            return elem.$('span[class="fas fa-pencil-alt"]').isExisting();
        })[0]
    }
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

    searchCourseByName(courseName) {
        this.searchNameInput.setValue(courseName);
        this.openCourseFromSearch.click();
    }

    searchCourseByCode(codeCourse) {
        this.searchCodeInput.waitForExist({timeout: 15000});
        this.searchCodeInput.waitForDisplayed({timeout: 15000});
        this.searchCodeInput.setValue(codeCourse);
        this.searchCodeBtn.waitForExist({timeout: 15000});
        this.searchCodeBtn.scrollIntoView();
        this.searchCodeBtn.click();
    }

    isValidTime(tsCheck) {
        let now = Date.now();
        /*return tsCheck.some(range => {
            return (now > range[0]) && (now < range[1]);
        });*/
        return true;
    }

    registerCourse(interval, tsCheck, groupNum) {
        let btns = 0, regGroup = [], isRegistered = false;

        while(!isRegistered && this.isValidTime(tsCheck)) {
            browser.refresh();
            expect(this.infoCourseBtns[0].isDisplayed()).toEqual(true);
            btns = this.registerCourseBtns.length;
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.log({btns});

            if(this.registerCourseBtns.length) {
                regGroup = this.groupsInfo.filter(group => {
                    return group.getText().includes(groupNum);
                });
            }

            if(regGroup.length) {
                this.registerGroupBtn(regGroup[0]).scrollIntoView();
                this.registerGroupBtn(regGroup[0]).click();
                // this.registerCourseBtns[0].scrollIntoView();
                // this.registerCourseBtns[0].click();
                console.log(`${groupNum} REGISTERED!!!`);
                return true;
            }

            regGroup = []
            browser.pause(interval);
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
