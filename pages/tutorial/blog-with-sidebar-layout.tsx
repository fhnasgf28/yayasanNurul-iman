/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";
import { HowToUseImageCode, HowToUseList, HowToUseSeperator, HowToUseTextCode, rightSideAdCode } from "../../src/constants/codeBlocks";

const Article = () => {
    return (
        // pass blogwithsidebar as show below for article page with sidebar layout
        <PageLayout blogwithsidebar >
            <section className="container md:pt-10 pt-20 px-0 md:px-[15px]">
       
            </section>
        </PageLayout>
    )
}

export default Article;