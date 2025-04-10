export class TextButton {
  constructor(text, x, y, width, height, onClick, ctx) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.onClick = function (event) {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;

      if (mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height) {
        onClick();
      }
    };
    this.ctx = ctx;
  }

  draw(isDisabled = false) {
    this.ctx.fillStyle = isDisabled
      ? "gray"
      : "#4CAF50";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = "white";
    this.ctx.font = "18px Arial";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    let textX = this.x + this.width / 2;
    let textY = this.y + this.height / 2;

    this.ctx.fillText(this.text, textX, textY);
  }
}

export class IconButton extends TextButton {
  constructor(text, x, y, width, height, onClick, ctx, iconSrc) {
    super(text, x, y, width, height, onClick, ctx);
    this.icon = new Image();
    this.icon.src = iconSrc;
    this.iconLoaded = false;

    this.icon.onload = () => {
      this.iconLoaded = true;
      this.draw();
    };
  }

  draw(isDisabled = false) {
    super.draw(isDisabled);

    if (this.iconLoaded) {
      let iconSize = 20;
      let iconX = this.x + 10;
      let iconY = this.y + (this.height - iconSize) / 2;
      this.ctx.drawImage(this.icon, iconX, iconY, iconSize, iconSize);
    }
  }
}

export class RightArrowButton extends IconButton {
  constructor(x, y, width, height, onClick, ctx) {
    super("다음", x, y, width, height, onClick, ctx, "images/icons8-원-셰브론-오른쪽-50.png");
  }
}

export class LeftArrowButton extends IconButton {
  constructor(x, y, width, height, onClick, ctx) {
    super("이전", x, y, width, height, onClick, ctx, "images/icons8-원-셰브론-왼쪽-50.png");
  }
}

export class PlayButton extends IconButton {
  constructor(x, y, width, height, onClick, ctx) {
    super("재생", x, y, width, height, onClick, ctx, "images/icons8-원-플레이.gif");
  }
}
