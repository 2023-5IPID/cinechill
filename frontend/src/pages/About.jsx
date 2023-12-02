import React from 'react';

export default function About() {



    const openingHours = [
        { day: 'Lundi', hours: '11h00 - 23h00' },
        { day: 'Mardi', hours: '11h00 - 23h00' },
        { day: 'Mercredi', hours: '11h00 - 23h00' },
        { day: 'Jeudi', hours: '11h00 - 23h00' },
        { day: 'Vendredi', hours: '11h00 - 23h00' },
        { day: 'Samedi', hours: '11h00 - 23h00' },
        { day: 'Dimanche', hours: '11h00 - 23h00' },
    ];

    const testimonials = [
        { text: "Le meilleur cinéma de la ville! Toujours une expérience incroyable.", author: "Pauline R." },
        { text: "Très déçu par le manque de propreté et le service.", author: "Marc D." },
        { text: "Expérience exceptionnelle! Personnel sympathique et installations modernes.", author: "Sophie L." },
        { text: "Des sièges confortables et une qualité audiovisuelle exceptionnelle!", author: "Jean B." },
        { text: "Ambiance chaleureuse et films variés, toujours un plaisir.", author: "Lucas G." },
        { text: "Superbes installations, mais les tarifs sont trop élevés.", author: "Céline S." },
        { text: "Le personnel est incroyablement accueillant, un vrai plaisir à chaque visite.", author: "Maxime F." },
        { text: "Des animations et événements réguliers, c'est fantastique!", author: "Léa P." },
        { text: "Le café est délicieux, un vrai atout pour le cinéma!", author: "Elodie M." },
        { text: "Un endroit génial pour passer un bon moment avec les amis.", author: "Pierre R." },
        { text: "Personnel aimable, SURTOUT ELIOTT mais les horaires pourraient être plus flexibles.", author: "Julie B." }
    ];



    return (
        <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4 dark:text-white">CINECHILL.</h1>
                    <hr className="border-b-2 border-gray-300 mb-6 dark:border-gray-600" />
                    <div className="text-lg text-gray-700 mb-8 dark:text-gray-300 ">
                        <p>Fondé en 1998, CineChill est bien plus qu'un simple cinéma. C'est un lieu où les émotions prennent vie sur grand écran.</p>
                        <p>Situé au cœur du centre-ville, Place du Cinéma, 75000 Ville Lumière, notre cinéma vous accueille chaleureusement tous les jours de la semaine de 11h à 23h.</p><br></br>
                        <p>Nos 12 salles ultramodernes offrent une expérience immersive grâce à des technologies audiovisuelles de pointe. Nous proposons une vaste sélection de films, des dernières sorties jusqu'aux joyaux classiques du cinéma.</p>
                        <p>Notre bar propose un assortiment alléchant de popcorn, de boissons fraîches et de collations, enrichissant l'expérience cinématographique.</p>
                        <p>Chez CineChill, l'accessibilité est une priorité : nos salles sont adaptées pour accueillir les personnes à mobilité réduite. De plus, nous offrons le sous-titrage et l'audiodescription pour les malentendants.</p><br></br>
                        <p>Nous vous invitons à explorer nos soirées avant-premières, nos festivals de cinéma et nos soirées thématiques hebdomadaires.</p>
                        <p>Profitez également de nos offres spéciales telles que notre programme de fidélité, vous accordant des réductions, ainsi que nos journées spéciales pour les groupes et les familles.</p>
                        <p>Notre objectif est de créer un espace accueillant où la magie du cinéma est accessible à tous. CineChill s'engage à offrir des expériences inoubliables, que vous soyez un cinéphile passionné ou simplement à la recherche d'une soirée divertissante en famille ou entre amis.</p>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className=" p-4 rounded-lg">
                        <h3 className="font-semibold mb-4 text-xl text-black-900 dark:text-gray-300">Horaires d'ouverture</h3>
                        <table>
                            <tbody className="dark:text-gray-300">
                                {openingHours.map((schedule, index) => (
                                    <tr key={index}>
                                        <td>{schedule.day}</td>
                                        <td>{schedule.hours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className=" dark:text-gray-300 p-4 rounded-lg mt-8">
                        <h3 className="text-lg font-semibold mb-4 ">Témoignages</h3>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.text}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-100">- {testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}    