class Renderer {
  isApplicable(object: any): boolean {
    return true;
  }

  render(
    glContext: CanvasRenderingContext2D,
    object: any,
    delta: number
  ): void {
    throw new Error(
      `Renderer ${this.constructor.name} does not implement the render method.`
    );
  }
}

export default Renderer;
