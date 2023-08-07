/**These are necessary imports / components for the page */
import { PageLayout, Text, List, Image, LinkTo, Seperator, Slider } from "../../src/components";
import CodeBlock from "../../src/components/CodeBlock";

const HomeLayoutExample = () => {

    return (
        <PageLayout home>
            <section className="container bg-white rounded-lg shadow-lg p-8 mb-8">
            <header className="bg-blue-600 text-white py-4 px-8">
                    <h1 className="text-3xl font-bold">Masjid Nurul iman Menyelenggarakan Idul Adha dan Berqurban</h1>
            </header>


        </section>
        </PageLayout>
    )
}

export default HomeLayoutExample