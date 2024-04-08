module.exports = async (page, _scenario, _vp) => {
  await page.waitForFunction(() => !document.querySelector("#skeleton"));
};
