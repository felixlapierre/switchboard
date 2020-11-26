package system_tests;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;
import org.springframework.test.context.event.annotation.BeforeTestClass;

import java.util.List;

public class TrialSeleniumTest {
    private static WebDriver driver;

    @BeforeAll
    static void setUp(){
        System.setProperty("webdriver.chrome.driver","src\\test\\java\\system_tests\\chromedriver.exe");
        driver = new ChromeDriver();
    }

    @Test
    void testAddDecoder(){
        driver.get("http://localhost:3000/Devices");
        driver.manage().window().setSize(new Dimension(782, 818));

        //populate Name, Serial Name and IP Address fields
        driver.findElement(By.id("nameSearch")).sendKeys("Sender 10");
        driver.findElement(By.id("serialSearch")).sendKeys("1:10:111:999");
        driver.findElement(By.id("ipSearch")).sendKeys("123:456");



    }

}
