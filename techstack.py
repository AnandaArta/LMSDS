from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time

# ===== Inisialisasi WebDriver =====
driver = webdriver.Chrome(executable_path="./drivers/chromedriver")
driver.maximize_window()

# ===== Buka Website =====
driver.get("https://www.saucedemo.com/")

# ===== Login Sukses =====
username_input = driver.find_element(By.ID, "user-name")
password_input = driver.find_element(By.ID, "password")
login_button = driver.find_element(By.ID, "login-button")

username_input.send_keys("standard_user")  # akun default
password_input.send_keys("secret_sauce")
login_button.click()

time.sleep(2)  # tunggu halaman load

# ===== Urutkan Produk dari A-Z =====
sort_dropdown = Select(driver.find_element(By.CLASS_NAME, "product_sort_container"))
sort_dropdown.select_by_visible_text("Name (A to Z)")

time.sleep(2)  # lihat hasil sorting

# ===== Verifikasi (print nama produk) =====
products = driver.find_elements(By.CLASS_NAME, "inventory_item_name")
print("Produk setelah sorting A-Z:")
for product in products:
    print(product.text)

# ===== Tutup Browser =====
driver.quit()
