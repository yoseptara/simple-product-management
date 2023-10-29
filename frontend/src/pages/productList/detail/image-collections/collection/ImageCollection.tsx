import React from "react";
import * as S from "./ImageCollection.styles";

export const ImageCollection: React.FC<{ id: number; url: string }> = ({
  url,
}) => {
  return (
    <S.Card padding={0} $img={url}>
      <S.CollectionImage src={url} alt="image" />
      {/* <S.NftCollectionInfo>
        <S.AuthorAvatarWrapper>
          <BaseAvatar shape="circle" size={64} src={avatar} alt={owner} />
        </S.AuthorAvatarWrapper>
        <S.InfoRow>
          <S.Title level={5}>{title}</S.Title>
        </S.InfoRow>
        <S.InfoRow>
          <S.OwnerText>
            {t("nft.by")} {owner}
          </S.OwnerText>
          <S.USDText>
            {getCurrencyPrice(
              formatNumberWithCommas(usd_value),
              CurrencyTypeEnum.USD
            )}
          </S.USDText>
        </S.InfoRow>
      </S.NftCollectionInfo> */}
    </S.Card>
  );
};
