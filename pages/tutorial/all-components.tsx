import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  PageLayout,
  Text,
  LinkTo,
  Slider,
  Seperator,
  Image,
  List,
  Accordian,
  VideoPlayer,
} from "../../src/components";
import { ListType, ImageSize } from "../../src/shared/enums";
import { combineClasses } from "../../src/utils/utils";
import CodeBlock from "../../src/components/CodeBlock";
import {
  HowToUseList,
  HowToUseSeperator,
  HowToUsePageLayout,
  HowToUseImageCode,
  HowToUseTextCode,
  HowToUseLinkTo,
  HowToUseSlider,
  HowToUseAccordian,
  HowToUseVideo,
} from "../../src/constants/codeBlocks";

interface iSideBtnLinks {
  component: string;
  types?: {
    label: string;
    href: string;
  }[];
  href?: string;
}

const AllComponents = () => {
  const router = useRouter();
  const routerIncludesHash = router.asPath.includes("#");
  const [activeHash, setActiveHash] = useState("");
  const cardBBorder =
    "border-b-[8px] border-blue-500 bg-white dark:bg-slate-800 shadow-md md:rounded-lg px-3 pb-2 pt-1 mb-8";

  useEffect(() => {
    if (routerIncludesHash) {
      const split = router.asPath.split("#");
      setActiveHash(split[split.length - 1]);
    }
  }, [router]);

  const isActive = (href: string) => href === "#" + activeHash;

  // all side btn links
  const sideBtns: iSideBtnLinks[] = [
    {
      component: "Page Layouts",
      href: "#pageLayouts",
    },
    {
      component: "Text",
      href: "#text",
    },
    {
      component: "Image",
      href: "#image",
    },
    {
      component: "List",
      href: "#list",
    },
    {
      component: "Section seperator",
      href: "#seperator",
    },
    {
      component: "LinkTo",
      href: "#linkto",
    },
    {
      component: "Image Slider",
      href: "#imageslider",
    },
    {
      component: "Accordian",
      href: "#accordian",
    },
    {
      component: "Video Player",
      href: "#videoPlayer",
    },
  ];

  const sideBtnsComponents = () => {
    return sideBtns.map((each: any, i: any) => (
      <div key={each.component + i}>
        {each.types ? (
          <p className="text-xl font-semibold mb-3">{each.component}</p>
        ) : (
          <LinkTo
            href={each.href}
            key={each.href}
            className={combineClasses(
              "md:text-xl text-md font-semibold mb-3 block whitespace-nowrap md:mr-0 mr-5",
              isActive(each.href) && "text-blue-500"
            )}
          >
            {each.component}
          </LinkTo>
        )}
        <div className="mb-3">
          {each.types &&
            each.types.map((each: any) => (
              <LinkTo
                href={each.href}
                key={each.href}
                className={combineClasses(
                  "block text-gray-500 font-medium py-1 pl-3 border-l",
                  isActive(each.href) &&
                    "text-blue-500 border-blue-500 border-l-2"
                )}
              >
                {each.label}
              </LinkTo>
            ))}
        </div>
      </div>
    ));
  };

  return (
    <PageLayout>
      <section className="container md:pt-10 pt-20 px-0 md:px-[15px]">
       
      </section>
    </PageLayout>
  );
};

export default AllComponents;
