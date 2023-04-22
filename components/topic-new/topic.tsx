import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

import { ArrowForwardRounded } from "@mui/icons-material";

import { getAwsImageUrl } from "../../lib/utils";
import { TopicType, TypeType } from "../../lib/types";
import * as S from "./topic.styles";

export type TopicProps = {
  index?: number;
  topic?: TopicType;
  type?: TypeType;
  className?: string;
};

export const Topic = (props: TopicProps) => {
  const { type, topic, index, className } = { ...props };

  return (
    <Link href={`${type ? type.slug : topic.typeSlug}/${topic.slug}`}>
      <S.TiltCard>
        <div className="tilting-card-wrapper cursor-pointer">
          {new Array(9).fill("").map((index) => (
            <div
              className="mouse-position-tracker cursor-pointer"
              key={index}
            />
          ))}
          <div className="tilting-card-body">
            <Link href={`${type ? type.slug : topic.typeSlug}/${topic.slug}`}>
              <article className={clsx(className, "cursor-pointer")}>
                <S.Shape
                  className={
                    "box-border w-full flex items-stretch relative cursor-pointer flex-col place-content-end text-center overflow-hidden rounded-2xl"
                  }
                >
                  <S.Main
                    className={"p-4 content flex flex-col justify-center"}
                  >
                    <span
                      className={
                        "text-slate-50 text-4xl font-black mb-2 tracking-tighter opacity-75 z-10"
                      }
                    >
                      {topic.name}
                    </span>
                    <span
                      className={"text-md capitalize text-slate-50 opacity-50"}
                    >
                      {type ? type.name : topic.typeName}
                    </span>
                  </S.Main>
                  <S.Footer
                    className={clsx(
                      topic._count.articles > 0
                        ? "justify-stretch items-center layout-align-start-center"
                        : "justify-center items-center",
                      "px-5 py-4 flex-row flex border-t border-stone-100/25"
                    )}
                  >
                    {topic._count.articles > 0 ? (
                      <>
                        <span
                          className={
                            "text-xs text-left flex flex-auto text-slate-50 truncate"
                          }
                        >
                          See all <b>{topic._count.articles}</b> articles
                        </span>
                        <S.IconButton
                          className={
                            "text-slate-50 flex justify-center p-2 rounded-full"
                          }
                        >
                          <ArrowForwardRounded style={{ fontSize: 16 }} />
                        </S.IconButton>
                      </>
                    ) : (
                      <S.Soon
                        className={
                          "flex text-xs py-2 px-4 rounded-sm text-slate-50"
                        }
                      >
                        Coming soon
                      </S.Soon>
                    )}
                  </S.Footer>
                  <S.ImagePosition
                    className={"-z-10 rounded-2xl overflow-hidden absolute"}
                  >
                    <S.ImageWrapper
                      className={"rounded-2xl overflow-hidden relative"}
                    >
                      <Image
                        layout={"fill"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                        priority={index <= 16}
                        loading={index <= 50 ? "eager" : "lazy"}
                        src={getAwsImageUrl(
                          `/images/topics/${topic.slug}/thumbnail.jpg`
                        )}
                        alt={topic.name}
                      />
                    </S.ImageWrapper>
                  </S.ImagePosition>
                </S.Shape>
              </article>
            </Link>
          </div>
        </div>
      </S.TiltCard>
      {/* <S.TiltCard>
        <Image
          layout={"fill"}
          className="tilt-body"
          objectFit={"cover"}
          objectPosition={"center"}
          priority={index <= 16}
          loading={index <= 50 ? "eager" : "lazy"}
          src={getAwsImageUrl(`/images/topics/${topic.slug}/thumbnail.jpg`)}
          alt={topic.name}
        />
        {new Array(9).fill("").map((index) => (
          <div key={index} className="mouse-tracker" />
        ))}
      </S.TiltCard> */}
    </Link>
  );
};
