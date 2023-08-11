/**These are necessary imports / components for the page */
import { ImageSize, TextAlign, ListType } from "../../src/shared/enums";
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";


const Article = () => {
    return (
        // pass blogwithsidebar as show below for article page with sidebar layout
        <PageLayout blogwithsidebar >
            <section className=" containe bg-white rounded-lg shadow-lg p-8 mb-8">
                <header className="bg-blue-600 text-white py-4 px-8">
                        <h1 className="text-3xl font-bold">Yayasan Nurul Iman Perum Taman Singaperbangsa Karawang Adakan Acara Santunan Anak Yatim 10 Muharram</h1>
                </header>
            </section>
        </PageLayout>
    )
}

export default Article;