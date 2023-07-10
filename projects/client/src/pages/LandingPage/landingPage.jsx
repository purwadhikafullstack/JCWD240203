import Header from "../../components/header/headerPage";
import Banner from "../../components/banner/bannerPage";
import Footer from "../../components/footerRentify/footerPage";



export default function LandingPage() {
    return (
        <div className="w-full h-[100%] bg-white">
            <Header />

            <Banner />
            <main className="bg-white w-full mx-auto mt-28">
                <div className="flex justify-between px-48">
                    <div className="mt-6 ml-4 z-40 drop-shadow-2xl border rounded-lg bg-yellow-300 w-[394px] h-[170px]">
                        flexible
                    </div>
                    <div>
                        listings
                    </div>
                    <div>
                        filter
                    </div>
                </div>
            </main>
        </div>
    )
}