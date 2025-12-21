export default function About() {
    return (
        <div className="py-16 bg-white">
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                    <div className="md:5/12 lg:w-5/12">
                        <img
                            src="/logo/show.png"
                            alt="image"
                        />
                    </div>
                    <div className="md:7/12 lg:w-6/12">
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            This collabVerse is developed for final project hackathon
                        </h2>
                        
                        <p className="mt-4 text-gray-600">
                        CollabVerse is a collaborative virtual space where people come together to create, communicate, and build in real time. It blends social interaction, shared rooms, and immersive experiences to enable seamless teamwork—whether through chat, movement, or creative collaboration. Designed for connection and creativity, CollabVerse empowers users to explore ideas, collaborate with others, 
                        and turn shared moments into meaningful outcomes in a dynamic digital universe.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}