const { By, until } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver/lib/select");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;

    // Locators
    this.inventoryList = By.className("inventory_list");
    this.sortDropdown = By.className("product_sort_container");
    this.productNames = By.className("inventory_item_name");
  }

  async waitUntilLoaded() {
    await this.driver.wait(until.elementLocated(this.inventoryList), 5000);
  }

  async sortByNameAZ() {
    const dropdown = await this.driver.findElement(this.sortDropdown);
    const select = new Select(dropdown);
    await select.selectByVisibleText("Name (A to Z)");
  }

  async getProductNames() {
    const products = await this.driver.findElements(this.productNames);
    let names = [];

    for (let product of products) {
      names.push(await product.getText());
    }

    return names;
  }
}

module.exports = InventoryPage;
