const { Builder } = require("selenium-webdriver");
require("chromedriver");
const assert = require("assert");

const LoginPage = require("../pages/LoginPage");
const InventoryPage = require("../pages/InventoryPage");

describe("SauceDemo - Sorting Produk A-Z (POM)", function () {
  let driver;
  let loginPage;
  let inventoryPage;

  // ===== BEFORE =====
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();

    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
  });

  // ===== BEFORE EACH =====
  beforeEach(async function () {
    await loginPage.open();
  });

  it("User berhasil login dan sorting produk A-Z", async function () {
    // Login
    await loginPage.login("standard_user", "secret_sauce");

    // Tunggu inventory page
    await inventoryPage.waitUntilLoaded();

    // Sorting
    await inventoryPage.sortByNameAZ();

    // Ambil nama produk
    const productNames = await inventoryPage.getProductNames();

    console.log("Produk setelah sorting A-Z:");
    console.log(productNames);

    // ASSERT sorting A-Z
    const sortedNames = [...productNames].sort();
    assert.deepStrictEqual(productNames, sortedNames);
  });

  // ===== AFTER EACH =====
  afterEach(async function () {
    console.log("Test case selesai dijalankan");
  });

  // ===== AFTER =====
  after(async function () {
    await driver.quit();
  });
});
