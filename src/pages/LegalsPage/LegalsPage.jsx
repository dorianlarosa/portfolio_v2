import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
    PageTransition, ScrollToTop, CustomLink, BannerImage
} from "../../components";

import { useCustomCursor } from '../../hooks/useCustomCursor';
import "./LegalsPage.scss";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const LegalsPage = (props) => {

    return (
        <>
            <section id="section-legals">
                <div className="container">

                    <h2 data-aos="fade" data-aos-delay="1000" data-aos-anchor="#section-legals">Définitions</h2>
                    <p data-aos="fade" data-aos-delay="1100" data-aos-anchor="#section-legals">
                        <b>Client :</b> tout professionnel ou personne physique capable au sens des
                        articles 1123 et suivants du Code civil, ou personne morale, qui visite le
                        Site objet des présentes conditions générales.
                    </p>

                    <p data-aos="fade" data-aos-delay="1200" data-aos-anchor="#section-legals">
                        <b>Prestations et Services :</b>{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> met à
                        disposition des Clients :
                    </p>
                    <p data-aos="fade" data-aos-delay="1300" data-aos-anchor="#section-legals">
                        <b>Contenu :</b> Ensemble des éléments constituants l’information présente
                        sur le Site, notamment textes – images – vidéos.
                    </p>
                    <p data-aos="fade" data-aos-delay="1400" data-aos-anchor="#section-legals">
                        <b>Informations clients :</b> Ci après dénommé « Information (s) » qui
                        correspondent à l’ensemble des données personnelles susceptibles d’être
                        détenues par <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>{" "}
                        pour la gestion de votre compte, de la gestion de la relation client et à
                        des fins d’analyses et de statistiques.
                    </p>
                    <p data-aos="fade" data-aos-delay="1500" data-aos-anchor="#section-legals">
                        <b>Utilisateur :</b> Internaute se connectant, utilisant le site susnommé.
                    </p>
                    <p data-aos="fade" data-aos-delay="1600" data-aos-anchor="#section-legals">
                        <b>Informations personnelles :</b> « Les informations qui permettent, sous
                        quelque forme que ce soit, directement ou non, l'identification des
                        personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n°
                        78-17 du 6 janvier 1978).
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Les termes « données à caractère personnel », « personne concernée », « sous
                        traitant » et « données sensibles » ont le sens défini par le Règlement
                        Général sur la Protection des Données (RGPD : n° 2016-679)
                    </p>
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">1. Présentation du site internet.</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la
                        confiance dans l'économie numérique, il est précisé aux utilisateurs du site
                        internet <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>{" "}
                        l'identité des différents intervenants dans le cadre de sa réalisation et de
                        son suivi:
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <strong>Propriétaire</strong> : Dorian LA ROSA – 1 rue de la chapelle 25320
                        Montferrand-le-Château
                        <br />
                        <strong>Responsable publication</strong> : Dorian LA ROSA –
                        hello@dorianlarosa.fr
                        <br />
                        Le responsable publication est une personne physique ou une personne morale.
                        <br />
                        <strong>Webmaster</strong> : Dorian LA ROSA – hello@dorianlarosa.fr
                        <br />
                        <strong>Hébergeur</strong> : O2Switch – Chemin des Pardiaux 63000
                        Clermont-Ferrand 04 44 44 60 40
                        <br />
                        <strong>Délégué à la protection des données</strong> : Dorian LA ROSA –
                        hello@dorianlarosa.fr
                        <br />
                    </p>

                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        2. Conditions générales d’utilisation du site et des services proposés.
                    </h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Le Site constitue une œuvre de l’esprit protégée par les dispositions du
                        Code de la Propriété Intellectuelle et des Réglementations Internationales
                        applicables. Le Client ne peut en aucune manière réutiliser, céder ou
                        exploiter pour son propre compte tout ou partie des éléments ou travaux du
                        Site.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        L’utilisation du site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> implique
                        l’acceptation pleine et entière des conditions générales d’utilisation
                        ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être
                        modifiées ou complétées à tout moment, les utilisateurs du site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> sont donc
                        invités à les consulter de manière régulière.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Ce site internet est normalement accessible à tout moment aux utilisateurs.
                        Une interruption pour raison de maintenance technique peut être toutefois
                        décidée par <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>,
                        qui s’efforcera alors de communiquer préalablement aux utilisateurs les
                        dates et heures de l’intervention. Le site web{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> est mis à jour
                        régulièrement par{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> responsable.
                        De la même façon, les mentions légales peuvent être modifiées à tout moment
                        : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le
                        plus souvent possible afin d’en prendre connaissance.
                    </p>
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">3. Description des services fournis.</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Le site internet{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> a pour objet
                        de fournir une information concernant l’ensemble des activités de la
                        société.
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> s’efforce de
                        fournir sur le site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> des
                        informations aussi précises que possible. Toutefois, il ne pourra être tenu
                        responsable des oublis, des inexactitudes et des carences dans la mise à
                        jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui
                        fournissent ces informations.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Toutes les informations indiquées sur le site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> sont données à
                        titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les
                        renseignements figurant sur le site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> ne sont pas
                        exhaustifs. Ils sont donnés sous réserve de modifications ayant été
                        apportées depuis leur mise en ligne.
                    </p>
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">4. Limitations contractuelles sur les données techniques.</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Le site utilise la technologie JavaScript. Le site Internet ne pourra être
                        tenu responsable de dommages matériels liés à l’utilisation du site. De
                        plus, l’utilisateur du site s’engage à accéder au site en utilisant un
                        matériel récent, ne contenant pas de virus et avec un navigateur de dernière
                        génération mis-à-jour Le site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> est hébergé
                        chez un prestataire sur le territoire de l’Union Européenne conformément aux
                        dispositions du Règlement Général sur la Protection des Données (RGPD : n°
                        2016-679)
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        L’objectif est d’apporter une prestation qui assure le meilleur taux
                        d’accessibilité. L’hébergeur assure la continuité de son service 24 Heures
                        sur 24, tous les jours de l’année. Il se réserve néanmoins la possibilité
                        d’interrompre le service d’hébergement pour les durées les plus courtes
                        possibles notamment à des fins de maintenance, d’amélioration de ses
                        infrastructures, de défaillance de ses infrastructures ou si les Prestations
                        et Services génèrent un trafic réputé anormal.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> et l’hébergeur
                        ne pourront être tenus responsables en cas de dysfonctionnement du réseau
                        Internet, des lignes téléphoniques ou du matériel informatique et de
                        téléphonie lié notamment à l’encombrement du réseau empêchant l’accès au
                        serveur.
                    </p>
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">5. Propriété intellectuelle et contrefaçons.</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> est
                        propriétaire des droits de propriété intellectuelle et détient les droits
                        d’usage sur tous les éléments accessibles sur le site internet, notamment
                        les textes, images, graphismes, logos, vidéos, icônes et sons. Toute
                        reproduction, représentation, modification, publication, adaptation de tout
                        ou partie des éléments du site, quel que soit le moyen ou le procédé
                        utilisé, est interdite, sauf autorisation écrite préalable de :{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Toute exploitation non autorisée du site ou de l’un quelconque des éléments
                        qu’il contient sera considérée comme constitutive d’une contrefaçon et
                        poursuivie conformément aux dispositions des articles L.335-2 et suivants du
                        Code de Propriété Intellectuelle.
                    </p>
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">6. Limitations de responsabilité.</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> agit en tant
                        qu’éditeur du site.{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> est
                        responsable de la qualité et de la véracité du Contenu qu’il publie.{" "}
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> ne pourra être
                        tenu responsable des dommages directs et indirects causés au matériel de
                        l’utilisateur, lors de l’accès au site internet{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>, et résultant
                        soit de l’utilisation d’un matériel ne répondant pas aux spécifications
                        indiquées au point 4, soit de l’apparition d’un bug ou d’une
                        incompatibilité.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> ne pourra
                        également être tenu responsable des dommages indirects (tels par exemple
                        qu’une perte de marché ou perte d’une chance) consécutifs à l’utilisation du
                        site <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>. Des
                        espaces interactifs (possibilité de poser des questions dans l’espace
                        contact) sont à la disposition des utilisateurs.{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> se réserve le
                        droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans
                        cet espace qui contreviendrait à la législation applicable en France, en
                        particulier aux dispositions relatives à la protection des données. Le cas
                        échéant, <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> se
                        réserve également la possibilité de mettre en cause la responsabilité civile
                        et/ou pénale de l’utilisateur, notamment en cas de message à caractère
                        raciste, injurieux, diffamant, ou pornographique, quel que soit le support
                        utilisé (texte, photographie …).
                    </p>
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">7. Gestion des données personnelles.</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Le Client est informé des réglementations concernant la communication
                        marketing, la loi du 21 Juin 2014 pour la confiance dans l’Economie
                        Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du
                        Règlement Général sur la Protection des Données (RGPD : n° 2016-679).{" "}
                    </p>
                    <h3>7.1 Responsables de la collecte des données personnelles</h3>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Pour les Données Personnelles collectées dans le cadre de la création du
                        compte personnel de l’Utilisateur et de sa navigation sur le Site, le
                        responsable du traitement des Données Personnelles est : Dorian LA ROSA.{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>est représenté
                        par Dorian LA ROSA, son représentant légal
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        En tant que responsable du traitement des données qu’il collecte,{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> s’engage à
                        respecter le cadre des dispositions légales en vigueur. Il lui appartient
                        notamment au Client d’établir les finalités de ses traitements de données,
                        de fournir à ses prospects et clients, à partir de la collecte de leurs
                        consentements, une information complète sur le traitement de leurs données
                        personnelles et de maintenir un registre des traitements conforme à la
                        réalité. Chaque fois que{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> traite des
                        Données Personnelles,{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> prend toutes
                        les mesures raisonnables pour s’assurer de l’exactitude et de la pertinence
                        des Données Personnelles au regard des finalités pour lesquelles{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> les traite.
                    </p>
                    <h3>7.2 Finalité des données collectées</h3>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> est
                        susceptible de traiter tout ou partie des données :{" "}
                    </p>
                    <ul data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <li>
                            pour permettre la navigation sur le Site et la gestion et la traçabilité
                            des prestations et services commandés par l’utilisateur : données de
                            connexion et d’utilisation du Site, facturation, historique des commandes,
                            etc.{" "}
                        </li>
                        <li>
                            pour prévenir et lutter contre la fraude informatique (spamming, hacking…)
                            : matériel informatique utilisé pour la navigation, l’adresse IP, le mot
                            de passe (hashé){" "}
                        </li>
                        <li>
                            pour améliorer la navigation sur le Site : données de connexion et
                            d’utilisation{" "}
                        </li>
                        <li>
                            pour mener des enquêtes de satisfaction facultatives sur{" "}
                            <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> : adresse
                            email{" "}
                        </li>
                        <li>
                            pour mener des campagnes de communication (sms, mail) : numéro de
                            téléphone, adresse email
                        </li>
                    </ul>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> ne
                        commercialise pas vos données personnelles qui sont donc uniquement
                        utilisées par nécessité ou à des fins statistiques et d’analyses.
                    </p>
                    <h3>7.3 Droit d’accès, de rectification et d’opposition</h3>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Conformément à la réglementation européenne en vigueur, les Utilisateurs de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> disposent des
                        droits suivants :{" "}
                    </p>
                    <ul data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <li>
                            droit d'accès (article 15 RGPD) et de rectification (article 16 RGPD), de
                            mise à jour, de complétude des données des Utilisateurs droit de
                            verrouillage ou d’effacement des données des Utilisateurs à caractère
                            personnel (article 17 du RGPD), lorsqu’elles sont inexactes, incomplètes,
                            équivoques, périmées, ou dont la collecte, l'utilisation, la communication
                            ou la conservation est interdite{" "}
                        </li>
                        <li>
                            droit de retirer à tout moment un consentement (article 13-2c RGPD){" "}
                        </li>
                        <li>
                            droit à la limitation du traitement des données des Utilisateurs (article
                            18 RGPD){" "}
                        </li>
                        <li>
                            droit d’opposition au traitement des données des Utilisateurs (article 21
                            RGPD){" "}
                        </li>
                        <li>
                            droit à la portabilité des données que les Utilisateurs auront fournies,
                            lorsque ces données font l’objet de traitements automatisés fondés sur
                            leur consentement ou sur un contrat (article 20 RGPD){" "}
                        </li>
                        <li>
                            droit de définir le sort des données des Utilisateurs après leur mort et
                            de choisir à qui{" "}
                            <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> devra
                            communiquer (ou non) ses données à un tiers qu’ils aura préalablement
                            désigné
                        </li>
                    </ul>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Dès que <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> a
                        connaissance du décès d’un Utilisateur et à défaut d’instructions de sa
                        part, <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> s’engage
                        à détruire ses données, sauf si leur conservation s’avère nécessaire à des
                        fins probatoires ou pour répondre à une obligation légale.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Si l’Utilisateur souhaite savoir comment{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> utilise ses
                        Données Personnelles, demander à les rectifier ou s’oppose à leur
                        traitement, l’Utilisateur peut contacter{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> par écrit à
                        l’adresse suivante :{" "}
                    </p>
                    Dorian LA ROSA – DPO, Dorian LA ROSA <br />1 rue de la chapelle 25320
                    Montferrand-le-Château.
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Dans ce cas, l’Utilisateur doit indiquer les Données Personnelles qu’il
                        souhaiterait que{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> corrige, mette
                        à jour ou supprime, en s’identifiant précisément avec une copie d’une pièce
                        d’identité (carte d’identité ou passeport).{" "}
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Les demandes de suppression de Données Personnelles seront soumises aux
                        obligations qui sont imposées à{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> par la loi,
                        notamment en matière de conservation ou d’archivage des documents. Enfin,
                        les Utilisateurs de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> peuvent
                        déposer une réclamation auprès des autorités de contrôle, et notamment de la
                        CNIL (https://www.cnil.fr/fr/plaintes).
                    </p>
                    <h3>7.4 Non-communication des données personnelles</h3>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> s’interdit de
                        traiter, héberger ou transférer les Informations collectées sur ses Clients
                        vers un pays situé en dehors de l’Union européenne ou reconnu comme « non
                        adéquat » par la Commission européenne sans en informer préalablement le
                        client. Pour autant,{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> reste libre du
                        choix de ses sous-traitants techniques et commerciaux à la condition qu’il
                        présentent les garanties suffisantes au regard des exigences du Règlement
                        Général sur la Protection des Données (RGPD : n° 2016-679).
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> s’engage à
                        prendre toutes les précautions nécessaires afin de préserver la sécurité des
                        Informations et notamment qu’elles ne soient pas communiquées à des
                        personnes non autorisées. Cependant, si un incident impactant l’intégrité ou
                        la confidentialité des Informations du Client est portée à la connaissance
                        de <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>, celle-ci
                        devra dans les meilleurs délais informer le Client et lui communiquer les
                        mesures de corrections prises. Par ailleurs{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> ne collecte
                        aucune « données sensibles ».
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Les Données Personnelles de l’Utilisateur peuvent être traitées par des
                        filiales de <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> et
                        des sous-traitants (prestataires de services), exclusivement afin de
                        réaliser les finalités de la présente politique.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Dans la limite de leurs attributions respectives et pour les finalités
                        rappelées ci-dessus, les principales personnes susceptibles d’avoir accès
                        aux données des Utilisateurs de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> sont
                        principalement les agents de notre service client.
                    </p>
                    
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">8. Notification d’incident</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Quels que soient les efforts fournis, aucune méthode de transmission sur
                        Internet et aucune méthode de stockage électronique n'est complètement sûre.
                        Nous ne pouvons en conséquence pas garantir une sécurité absolue. Si nous
                        prenions connaissance d'une brèche de la sécurité, nous avertirions les
                        utilisateurs concernés afin qu'ils puissent prendre les mesures appropriées.
                        Nos procédures de notification d’incident tiennent compte de nos obligations
                        légales, qu'elles se situent au niveau national ou européen. Nous nous
                        engageons à informer pleinement nos clients de toutes les questions relevant
                        de la sécurité de leur compte et à leur fournir toutes les informations
                        nécessaires pour les aider à respecter leurs propres obligations
                        réglementaires en matière de reporting.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Aucune information personnelle de l'utilisateur du site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> n'est publiée
                        à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un
                        support quelconque à des tiers. Seule l'hypothèse du rachat de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> et de ses
                        droits permettrait la transmission des dites informations à l'éventuel
                        acquéreur qui serait à son tour tenu de la même obligation de conservation
                        et de modification des données vis à vis de l'utilisateur du site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>.
                    </p>
                    <h3>Sécurité</h3>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Pour assurer la sécurité et la confidentialité des Données Personnelles et
                        des Données Personnelles de Santé,{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> utilise des
                        réseaux protégés par des dispositifs standards tels que par pare-feu, la
                        pseudonymisation, l’encryption et mot de passe.{" "}
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Lors du traitement des Données Personnelles,{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>prend toutes
                        les mesures raisonnables visant à les protéger contre toute perte,
                        utilisation détournée, accès non autorisé, divulgation, altération ou
                        destruction.
                    </p>
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">9. Liens hypertextes « cookies » et balises (“tags”) internet</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Le site <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>{" "}
                        contient un certain nombre de liens hypertextes vers d’autres sites, mis en
                        place avec l’autorisation de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>. Cependant,{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> n’a pas la
                        possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en
                        conséquence aucune responsabilité de ce fait.
                    </p>
                    Sauf si vous décidez de désactiver les cookies, vous acceptez que le site
                    puisse les utiliser. Vous pouvez à tout moment désactiver ces cookies et ce
                    gratuitement à partir des possibilités de désactivation qui vous sont offertes
                    et rappelées ci-après, sachant que cela peut réduire ou empêcher
                    l’accessibilité à tout ou partie des Services proposés par le site.
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals" />
                    <h3>9.1. « COOKIES »</h3>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Un « cookie » est un petit fichier d’information envoyé sur le navigateur de
                        l’Utilisateur et enregistré au sein du terminal de l’Utilisateur (ex :
                        ordinateur, smartphone), (ci-après « Cookies »). Ce fichier comprend des
                        informations telles que le nom de domaine de l’Utilisateur, le fournisseur
                        d’accès Internet de l’Utilisateur, le système d’exploitation de
                        l’Utilisateur, ainsi que la date et l’heure d’accès. Les Cookies ne risquent
                        en aucun cas d’endommager le terminal de l’Utilisateur.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> est
                        susceptible de traiter les informations de l’Utilisateur concernant sa
                        visite du Site, telles que les pages consultées, les recherches effectuées.
                        Ces informations permettent à{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> d’améliorer le
                        contenu du Site, de la navigation de l’Utilisateur.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Les Cookies facilitant la navigation et/ou la fourniture des services
                        proposés par le Site, l’Utilisateur peut configurer son navigateur pour
                        qu’il lui permette de décider s’il souhaite ou non les accepter de manière à
                        ce que des Cookies soient enregistrés dans le terminal ou, au contraire,
                        qu’ils soient rejetés, soit systématiquement, soit selon leur émetteur.
                        L’Utilisateur peut également configurer son logiciel de navigation de
                        manière à ce que l’acceptation ou le refus des Cookies lui soient proposés
                        ponctuellement, avant qu’un Cookie soit susceptible d’être enregistré dans
                        son terminal. <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>{" "}
                        informe l’Utilisateur que, dans ce cas, il se peut que les fonctionnalités
                        de son logiciel de navigation ne soient pas toutes disponibles.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Si l’Utilisateur refuse l’enregistrement de Cookies dans son terminal ou son
                        navigateur, ou si l’Utilisateur supprime ceux qui y sont enregistrés,
                        l’Utilisateur est informé que sa navigation et son expérience sur le Site
                        peuvent être limitées. Cela pourrait également être le cas lorsque{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> ou l’un de ses
                        prestataires ne peut pas reconnaître, à des fins de compatibilité technique,
                        le type de navigateur utilisé par le terminal, les paramètres de langue et
                        d’affichage ou le pays depuis lequel le terminal semble connecté à Internet.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Le cas échéant,{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> décline toute
                        responsabilité pour les conséquences liées au fonctionnement dégradé du Site
                        et des services éventuellement proposés par{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>, résultant (i)
                        du refus de Cookies par l’Utilisateur (ii) de l’impossibilité pour{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> d’enregistrer
                        ou de consulter les Cookies nécessaires à leur fonctionnement du fait du
                        choix de l’Utilisateur. Pour la gestion des Cookies et des choix de
                        l’Utilisateur, la configuration de chaque navigateur est différente. Elle
                        est décrite dans le menu d’aide du navigateur, qui permettra de savoir de
                        quelle manière l’Utilisateur peut modifier ses souhaits en matière de
                        Cookies.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        À tout moment, l’Utilisateur peut faire le choix d’exprimer et de modifier
                        ses souhaits en matière de Cookies.{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> pourra en
                        outre faire appel aux services de prestataires externes pour l’aider à
                        recueillir et traiter les informations décrites dans cette section.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Enfin, en cliquant sur les icônes dédiées aux réseaux sociaux Twitter,
                        Facebook, Linkedin et Google Plus figurant sur le Site de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> ou dans son
                        application mobile et si l’Utilisateur a accepté le dépôt de cookies en
                        poursuivant sa navigation sur le Site Internet ou l’application mobile de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>, Twitter,
                        Facebook, Linkedin et Google Plus peuvent également déposer des cookies sur
                        vos terminaux (ordinateur, tablette, téléphone portable).
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Ces types de cookies ne sont déposés sur vos terminaux qu’à condition que
                        vous y consentiez, en continuant votre navigation sur le Site Internet ou
                        l’application mobile de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>. À tout
                        moment, l’Utilisateur peut néanmoins revenir sur son consentement à ce que{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> dépose ce type
                        de cookies.
                    </p>
                    <h3>Article 9.2. BALISES (“TAGS”) INTERNET</h3>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> peut employer
                        occasionnellement des balises Internet (également appelées « tags », ou
                        balises d’action, GIF à un pixel, GIF transparents, GIF invisibles et GIF un
                        à un) et les déployer par l’intermédiaire d’un partenaire spécialiste
                        d’analyses Web susceptible de se trouver (et donc de stocker les
                        informations correspondantes, y compris l’adresse IP de l’Utilisateur) dans
                        un pays étranger.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Ces balises sont placées à la fois dans les publicités en ligne permettant
                        aux internautes d’accéder au Site, et sur les différentes pages de celui-ci.
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Cette technologie permet à{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> d’évaluer les
                        réponses des visiteurs face au Site et l’efficacité de ses actions (par
                        exemple, le nombre de fois où une page est ouverte et les informations
                        consultées), ainsi que l’utilisation de ce Site par l’Utilisateur.{" "}
                    </p>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Le prestataire externe pourra éventuellement recueillir des informations sur
                        les visiteurs du Site et d’autres sites Internet grâce à ces balises,
                        constituer des rapports sur l’activité du Site à l’attention de{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink>, et fournir
                        d’autres services relatifs à l’utilisation de celui-ci et d’Internet.
                    </p>
                    <h2 data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">10. Droit applicable et attribution de juridiction.</h2>
                    <p data-aos="fade" data-aos-delay="1700" data-aos-anchor="#section-legals">
                        Tout litige en relation avec l’utilisation du site{" "}
                        <CustomLink to="https://dorianlarosa.fr">https://dorianlarosa.fr</CustomLink> est soumis au
                        droit français. En dehors des cas où la loi ne le permet pas, il est fait
                        attribution exclusive de juridiction aux tribunaux compétents de Besançon
                    </p>


                </div>
            </section>
            <BannerImage />
            <ScrollToTop />
            <PageTransition />
        </>
    );
};

export default LegalsPage;
