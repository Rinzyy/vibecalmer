
import { Github } from 'lucide-react'
import Link from 'next/link'



export default function FooterSection() {
    return (
        <footer className="py-16 bg-white dark:bg-neutral-900 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <Link
                    href="/"
                    aria-label="go home"
                    className="mx-auto block size-fit">
                    <h1 className="text-2xl font-mono text-neutral-500 dark:text-neutral-400">VibeCalmer</h1>
                </Link>

              
                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    <Link
                        href="https://x.com/Rinzynest"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="X/Twitter"
                        className="text-muted-foreground hover:text-primary block">
                        <svg
                            className="size-6"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                        </svg>
                    </Link>
                    <Link
                        href="https://github.com/Rinzyy/vibecalmer"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="text-muted-foreground hover:text-primary block">
                        <Github/>
                    </Link>
                   
                  
                </div>
            </div>
        </footer>
    )
}
