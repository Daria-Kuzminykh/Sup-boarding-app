import React, {useEffect, useState} from 'react';
import styles from './homepage.css';
import {Hero} from "./Hero";
import {Header} from "./Header";
import {About} from "./About";
import {Info} from "./Info";
import {RoutesPreview} from "./RoutesPreview";
import {EventsPreview} from "./EventsPreview";
import {Contacts} from "./Contacts";
import {Footer} from "./Footer";
import {UpButton} from "./UpButton";
import {useScrollToLink} from "../../hooks/useScrollToLink";

export function HomePage() {
	const [scroll, setScroll] = useState(0);
	useEffect(() => {
		useScrollToLink();

		function onScroll() {
			setScroll(window.pageYOffset);
		}

		window.addEventListener('scroll', onScroll);

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

  return (
    <div>
			<Header />
      <main>
				<Hero />
				<About />
				<Info />
				<RoutesPreview />
				<EventsPreview />
				<Contacts />
				<Footer />
				{scroll > 200 && (
					<UpButton />
				)}
				{/*<UpButton />*/}
			</main>
    </div>
  );
}
