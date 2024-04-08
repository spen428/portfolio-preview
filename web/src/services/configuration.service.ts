export default new (class ConfigurationService {
  private animationEnabled: boolean = true;

  public isAnimationEnabled(): boolean {
    return this.animationEnabled;
  }

  public setAnimationEnabled(enabled: boolean) {
    this.animationEnabled = enabled;

    if (enabled) {
      document.body.classList.remove("disable-animation");
    } else {
      document.body.classList.add("disable-animation");
    }
  }
})();
