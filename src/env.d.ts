/// <reference types="astro/client" />

interface Job {
	date: string;
	title: string;
	company: string;
	description: string;
	frontend?: string[];
	backend?: string[];
}

interface Project {
	img: string;
	status?: 'WIP' | 'Hosted' | 'Local';
	title: string;
	description: {
		problem: string;
		solution: string;
		tech: string[];
	};
	links?: { title: string; url: string; icon?: 'GitHub' }[];
}
