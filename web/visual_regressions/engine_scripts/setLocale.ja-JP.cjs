module.exports = async (page, scenario, _vp) => {
  await page.goto(scenario.url);
  await page.evaluate(() => localStorage.setItem("defaultLocale", "ja-JP"));
};
