import styled from "@emotion/styled";

// Wrapping the image twice. First to position it behind the content using absolute.
export const ImagePosition = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
// Then Wrapping it in a relative positionned div to prevent Chrome warnings. Setting a size is also mandatory.
export const ImageWrapper = styled.div`
  top: 0;
  left: 0;
  z-index: 0;
  height: 30rem;
  min-width: 20rem;
  max-width: 20rem;
  img {
    overflow: hidden;
  }
`;

export const Main = styled.main`
  z-index: 2;
  transition: all 0.4s ease-in-out;
`;

export const Footer = Main.withComponent("footer");

export const IconButton = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
`;

export const Soon = styled.span`
  opacity: 0.5;
  background: rgba(255, 255, 255, 0.15);
`;

export const Shape = styled.div`
  height: 30rem;
  min-width: 20rem;
  max-width: 20rem !important;

  box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0.2),
    inset 0px 1px 0px rgba(255, 255, 255, 0.25);

  &:hover {
    box-shadow: inset 0px 0px 0px 1px rgba(255, 255, 255, 0.5),
      inset 0px 1px 0px rgba(255, 255, 255, 0.45);
  }

  .image-wrapper {
    &:before {
      top: 0;
      left: 0;
      z-index: 0;
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      background: rgba(0, 0, 0, 0.1);
      transition: all 0.6s ease-in-out;
    }

    &:hover {
      .image-wrapper::before {
        background: rgba(0, 0, 0, 0);
        transition: all 0.6s ease-in-out;
      }
      .content {
        margin-bottom: 2rem;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;

export const TiltCard = styled.article`
  .tilting-card-body {
    display: grid;
    place-content: center;
    text-align: center;
    box-shadow: var(--shadow);
    height: 30rem;
    min-width: 20rem;
    max-width: 20rem !important;
  }

  .mouse-position-tracker {
    position: absolute;
    width: calc(100% / 3);
    height: calc(100% / 3);
    z-index: 2;
  }

  /* 1st, 4th, 7th */
  .mouse-position-tracker:nth-child(3n - 2) {
    left: 0;
  }
  /* 2nd, 5th, 8th */
  .mouse-position-tracker:nth-child(3n - 1) {
    left: calc(100% / 3);
  }

  /* 2nd, 5th, 8th */
  .mouse-position-tracker:nth-child(3n) {
    right: 0;
  }

  /* 4 to 6 */
  .mouse-position-tracker:nth-child(n + 4):nth-child(-n + 6) {
    top: calc(100% / 3);
  }
  /* 7 to 9 */
  .mouse-position-tracker:nth-child(n + 7):nth-child(-n + 9) {
    bottom: 0;
  }

  .tilting-card-wrapper {
    position: relative;
    height: 30rem;
    min-width: 20rem;
    max-width: 20rem !important;
  }

  .tilting-card-body {
    position: absolute;
    inset: 0;
  }

  .tilting-card-body > :where(h1, p) {
    background: white;
    padding: 0.2rem;
    margin: 0;
  }

  .tilting-card-body {
    --perspective: 60rem;
    --rotationX: 0;
    --rotationY: 0;
    --rotationZ: 0;
    --angle: 5deg;
    transform: perspective(var(--perspective)) rotateX(var(--rotationX))
      rotateY(var(--rotationY)) rotateZ(var(--rotationZ));
    transition: transform 500ms ease;
  }

  .mouse-position-tracker:nth-child(1):hover ~ .tilting-card-body {
    --rotationX: var(--angle);
    --rotationY: calc(var(--angle) * -1);
  }

  .mouse-position-tracker:nth-child(2):hover ~ .tilting-card-body {
    --rotationX: var(--angle);
  }

  .mouse-position-tracker:nth-child(3):hover ~ .tilting-card-body {
    --rotationX: var(--angle);
    --rotationY: var(--angle);
  }

  .mouse-position-tracker:nth-child(4):hover ~ .tilting-card-body {
    --rotationY: calc(var(--angle) * -1);
  }

  .mouse-position-tracker:nth-child(6):hover ~ .tilting-card-body {
    --rotationY: var(--angle);
  }

  .mouse-position-tracker:nth-child(7):hover ~ .tilting-card-body {
    --rotationY: calc(var(--angle) * -1);
    --rotationX: calc(var(--angle) * -1);
  }

  .mouse-position-tracker:nth-child(8):hover ~ .tilting-card-body {
    --rotationX: calc(var(--angle) * -1);
  }

  .mouse-position-tracker:nth-child(9):hover ~ .tilting-card-body {
    --rotationY: var(--angle);
    --rotationX: calc(var(--angle) * -1);
  }
`;
