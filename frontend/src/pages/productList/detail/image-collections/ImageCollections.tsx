import React, { useMemo, useRef } from "react";
import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useResponsive } from "@src/hooks/useResponsive";
import * as S from "./ImageCollections.styles";
import { BaseCarousel } from "@src/components/common/BaseCarousel/Carousel";
import { BaseRow } from "@src/components/common/BaseRow/BaseRow";
import { BaseCol } from "@src/components/common/BaseCol/BaseCol";
import { ImageCardHeader } from "../common/ImageCardHeader/ImageCardHeader";
import { ImageCollection } from "./collection/ImageCollection";
import { ViewAll } from "../common/ViewAll/ViewAll";

type Image = {
  id: number;
  url: string;
};

type ImageCollectionsProps = {
  images: Image[];
};

export const ImageCollections: React.FC<ImageCollectionsProps> = ({
  images,
}) => {
  const { mobileOnly, isTablet: isTabletOrHigher } = useResponsive();

  const imageList = useMemo(() => {
    return {
      mobile: images
        .map((item, index) => <ImageCollection key={index} {...item} />)
        .slice(0, 3),
      tablet: images.map((item, index) => (
        <div key={index}>
          <S.CardWrapper>
            <ImageCollection {...item} />
          </S.CardWrapper>
        </div>
      )),
    };
  }, [images]);

  const sliderRef = useRef<Slider>(null);

  return (
    <>
      <ImageCardHeader title="Product Images">
        {images.length > 0 && isTabletOrHigher && (
          <BaseRow align="middle">
            <BaseCol>
              <ViewAll bordered={false} />
            </BaseCol>

            <BaseCol>
              <S.ArrowBtn
                type="text"
                size="small"
                onClick={() =>
                  sliderRef.current && sliderRef.current.slickPrev()
                }
              >
                <LeftOutlined />
              </S.ArrowBtn>
            </BaseCol>

            <BaseCol>
              <S.ArrowBtn
                type="text"
                size="small"
                onClick={() =>
                  sliderRef.current && sliderRef.current.slickNext()
                }
              >
                <RightOutlined />
              </S.ArrowBtn>
            </BaseCol>
          </BaseRow>
        )}
      </ImageCardHeader>

      <S.SectionWrapper>
        {mobileOnly && imageList.mobile}

        {isTabletOrHigher && images.length > 0 && (
          <BaseCarousel
            ref={sliderRef}
            slidesToShow={3}
            responsive={[
              {
                breakpoint: 1900,
                settings: {
                  slidesToShow: 2,
                },
              },
            ]}
          >
            {imageList.tablet}
          </BaseCarousel>
        )}
      </S.SectionWrapper>

      {mobileOnly && (
        <S.ViewAllWrapper>
          <ViewAll />
        </S.ViewAllWrapper>
      )}
    </>
  );
};
