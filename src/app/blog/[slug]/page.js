import { client } from '@/sanity/lib/client'
import { POST_BY_SLUG_QUERY, ALL_POST_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
    const posts = await client.fetch(ALL_POST_SLUGS_QUERY)
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params
    const { slug } = resolvedParams
    const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })

    if (!post) return { title: 'Post não encontrado' }

    return {
        title: `${post.title} | Blog`,
        description: post.excerpt,
    }
}

const portableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="relative w-full h-96 my-8 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        alt={value.alt || 'Imagem do Post'}
                        loading="lazy"
                        fill
                        className="object-cover"
                        src={urlFor(value).width(1200).height(800).fit('max').auto('format').url()}
                    />
                </div>
            )
        },
    },
}

export default async function BlogPostPage({ params }) {
    const resolvedParams = await params
    const { slug } = resolvedParams
    const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })

    if (!post) {
        notFound()
    }

    return (
        <article className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="mb-8">
                <Link href="/blog" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-8">
                    ← Voltar para o blog
                </Link>

                {post.publishedAt && (
                    <time className="text-sm text-muted-foreground block mb-4">
                        {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </time>
                )}
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight whitespace-pre-wrap tracking-tighter">
                    {post.title}
                </h1>
                {post.excerpt && (
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        {post.excerpt}
                    </p>
                )}
            </div>

            {post.mainImage && (
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
                    <Image
                        src={urlFor(post.mainImage).width(1200).height(675).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="prose prose-lg dark:prose-invert prose-slate prose-p:text-slate-300 prose-headings:text-white prose-strong:text-white prose-strong:font-extrabold max-w-none prose-a:text-cyan-400 hover:prose-a:text-cyan-300">
                {post.body ? (
                    <PortableText value={post.body} components={portableTextComponents} />
                ) : (
                    <p>Conteúdo vazio.</p>
                )}
            </div>
        </article>
    )
}
