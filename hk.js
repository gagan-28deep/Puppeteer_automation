const loginLink = "https://www.hackerrank.com/auth/login";

const puppeteer = require("puppeteer");
const answercode = require("./code");

let page;
let email = "sohijo2110@shackvine.com";
let password = "Real123";
let browserWillReturnPromise = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});

browserWillReturnPromise
  .then(function (browserInstance) {
    let newTabPromise = browserInstance.newPage();
    return newTabPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let websiteWIllOpenPromise = newTab.goto(loginLink);
    return websiteWIllOpenPromise;
  })
  .then(function () {
    let emailWillEnterPromise = page.type("input[id='input-1']", email, {
      delay: 50,
    });
    return emailWillEnterPromise;
  })
  .then(function () {
    let passWillEnterPromise = page.type("input[id='input-2']", password, {
      delay: 50,
    });
    return passWillEnterPromise;
  })
  .then(function () {
    let LoginDonePromise = page.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled",
      { delay: 50 }
    );
    return LoginDonePromise;
  })
  .then(function () {
    let algoSecClickedPromise = waitAndClick(
      "a[data-attr1 = 'algorithms']",
      page
    );
    return algoSecClickedPromise;
  })
  .then(function () {
    let warmUpCLickedPromise = waitAndClick('input[value="warmup"]', page);
    return warmUpCLickedPromise;
  })
  .then(function () {
    let allQuesArrayPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );
    //   $$ to select all selectors which is matching like in cheerio $
    return allQuesArrayPromise;
  })
  .then(function (totalQuestions) {
    console.log("Total number of questions = " + totalQuestions.length);
    let questionWillbeSolvedPromise = questionsolver(
      page,
      totalQuestions[0],
      answercode.answers[0]
    );
    return questionWillbeSolvedPromise;
  });

function waitAndClick(selector, cpage) {
  return new Promise(function (resolve, reject) {
    let waitForModalPromise = cpage.waitForSelector(selector);
    waitForModalPromise
      .then(function () {
        let clickModal = cpage.click(selector, { delay: 100 });
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}

function questionsolver(page, questions, answers) {
  return new Promise(function (resolve, reject) {
    let questionWillBeClickedPromise = questions.click();
    questionWillBeClickedPromise
      .then(function () {
        let waitForEditor = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForEditor;
      })
      .then(function () {
        let customInputClicked = waitAndClick(".checkbox-input", page);
        return customInputClicked;
      })
      .then(function () {
        return waitAndClick(".input.text-area.custominput.auto-width", page);
      })
      .then(function () {
        return page.type(".input.text-area.custominput.auto-width", answers, {
          delay: 20,
        });
      })
      .then(function () {
        let ctrlIsPressedPromise = page.keyboard.down("Control");
        return ctrlIsPressedPromise;
      })
      .then(function () {
        let AisPressedPromise = page.keyboard.press("A", { delay: 100 });
        return AisPressedPromise;
      })
      .then(function () {
        let XisPressedPromise = page.keyboard.press("X", { delay: 100 });
        return XisPressedPromise;
      })
      .then(function () {
        let ctrlReleasedPromise = page.keyboard.up("Control");
        return ctrlReleasedPromise;
      })
      .then(function () {
        let waitForCodeAreaPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForCodeAreaPromise;
      })
      .then(function () {
        let ctrlIsPressedPromise = page.keyboard.down("Control");
        return ctrlIsPressedPromise;
      })
      .then(function () {
        let AisPressedPromise = page.keyboard.press("A", { delay: 100 });
        return AisPressedPromise;
      })
      .then(function () {
        let VisPressedPromise = page.keyboard.press("V", { delay: 100 });
        return VisPressedPromise;
      })
      .then(function () {
        let ctrlReleasedPromise = page.keyboard.up("Control");
        return ctrlReleasedPromise;
      })
      .then(function () {
        let runButtonClickedPromise = page.click(".hr-monaco__run-code", {
          delay: 50,
        });
        return runButtonClickedPromise;
      })
      .then(function () {
        let waitForSubmitButton = waitAndClick(".hr-monaco-submit", page);
        return waitForSubmitButton;
      })
      .then(function () {
        let submitButtonClickedPromise = page.click(".hr-monaco-submit", {
          delay: 50,
        });
        return submitButtonClickedPromise;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}
