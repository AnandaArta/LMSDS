const { Builder, By, until } = require("selenium-webdriver");
const { Select } = require("selenium-webdriver/lib/select");
require("chromedriver");
const assert = require("assert");

describe("SauceDemo - Sorting Produk A-Z", function () {
  let driver;

  // ===== BEFORE =====
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  // ===== BEFORE EACH =====
  beforeEach(async function () {
    await driver.get("https://www.saucedemo.com/");
  });

  it("Login sukses dan sorting produk A-Z", async function () {
    // ===== Login =====
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // Tunggu halaman inventory
    await driver.wait(until.elementLocated(By.className("inventory_list")), 5000);

    // ===== Sorting A-Z =====
    const dropdown = await driver.findElement(By.className("product_sort_container"));
    const select = new Select(dropdown);
    await select.selectByVisibleText("Name (A to Z)");

    // ===== Verifikasi =====
    const products = await driver.findElements(By.className("inventory_item_name"));

    let productNames = [];
    for (let product of products) {
      productNames.push(await product.getText());
    }

    console.log("Produk setelah sorting A-Z:");
    console.log(productNames);

    // ASSERT sorting A-Z
    const sorted = [...productNames].sort();
    assert.deepStrictEqual(productNames, sorted);
  });

  // ===== AFTER EACH =====
  afterEach(async function () {
    console.log("Test selesai dijalankan");
  });

  // ===== AFTER =====
  after(async function () {
    await driver.quit();
  });
});
