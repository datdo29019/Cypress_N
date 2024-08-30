describe('Trying to implement drag-n-drop', () => {

  before(() => {
    const cyView = require("cy-view");

    const devices = [
        {
            model: "macbook-15",
            width: 1440,
            height: 900
        },
        {
            model: "ipad-2",
            width: 768,
            height: 1024
        },
        {
            model: "iphone-6+",
            width: 414,
            height: 736
        }
    ];
    
    // Add urls to test against
    const urls = [
        "https://va-test.vnlp.ai/"
    ];
    
    // Pass cy-view an array of devices structured like the devices constant above
    const washingMachinePageTests = cyView(devices);
    
    // Pass your urls constant in and your good to go!
    washingMachinePageTests(urls, () => {
        describe("My tests running on all viewports across various URLs", () => {
            it("should test something...", () => {
                //...do yo' thang
            });
        });
    });
  });

});