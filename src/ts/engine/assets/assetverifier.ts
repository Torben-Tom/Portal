class AssetVerifier {
  static verifyImage(image: HTMLImageElement): boolean {
    return (
      image !== null &&
      image !== undefined &&
      (image.complete || image.naturalHeight !== 0 || image.naturalWidth !== 0)
    );
  }

  static verifyAudio(audio: HTMLAudioElement): boolean {
    return (
      audio !== null &&
      audio !== undefined &&
      audio.readyState === HTMLMediaElement.HAVE_ENOUGH_DATA
    );
  }
}

export default AssetVerifier;
