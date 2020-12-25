import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

import { mainTheme } from "../../styled/styledConst";

const SliderStyled = styled(Slider)`
  margin-top: 30px;
  .slick-dots {
    top: -25px;
    height: fit-content;
    li {
      &.slick-active {
        button {
          ::before {
            color: ${mainTheme.palette.secondary.light};
          }
        }
      }
      button {
        ::before {
          color: ${mainTheme.palette.secondary.dark};
        }
      }
    }
  }
`;
const SlideContainer = styled.div`
  padding: 0px 2px;
  box-sizing: border-box;
`;

type SliderGlobalProps = {
  components: {
    title: string;
    component: React.ReactNode;
  }[];
};

const SliderGlobal: React.FC<SliderGlobalProps> = ({ components }) => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <SliderStyled {...settings}>
        {components.map((component) => (
          <SlideContainer key={component.title}>
            {component.component}
          </SlideContainer>
        ))}
      </SliderStyled>
    </div>
  );
};

export default SliderGlobal;
