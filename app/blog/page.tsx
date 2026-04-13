import Link from 'next/link';
import { getBlogs } from '@/lib/db/queries';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { Meteors } from '@/components/magic-ui/Meteors';
import { MotionStaggerContainer, MotionFadeItem } from '@/components/magic-ui/MotionFadeIn';

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  cover_image: string | null;
  created_at: Date;
  published: boolean;
};

export default async function BlogIndexPage() {
  const blogs = await getBlogs() as BlogPost[];

  return (
    <div className="relative min-h-screen bg-background overflow-hidden pb-20">
      {/* Magic UI Background Decorators */}
      <Meteors number={25} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-3xl opacity-50" />
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />

      {/* Hero Section */}
      <MotionStaggerContainer className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
        <MotionFadeItem>
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 drop-shadow-sm mb-6">
            The AJPR Daily
          </h1>
        </MotionFadeItem>
        <MotionFadeItem>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Daily insights into cutting-edge software development, business growth strategies, and enterprise-grade tech architecture.
          </p>
        </MotionFadeItem>
      </MotionStaggerContainer>

      {/* Blog Grid */}
      <div className="mx-auto max-w-6xl px-6">
        {blogs.length === 0 ? (
          <div className="text-center py-20 border border-dashed rounded-2xl border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground">Check back tomorrow for our first daily blog!</p>
          </div>
        ) : (
          <MotionStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <MotionFadeItem key={blog.id}>
                <Link href={`/blog/${blog.slug}`} className="group block focus:outline-none h-full">
                  <Card className="h-full bg-background/40 backdrop-blur-2xl border-white/10 overflow-hidden transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] hover:border-primary/50 flex flex-col group/card relative">
                    
                    {/* Magic Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Image Container with Hover Zoom */}
                    <div className="relative h-56 w-full overflow-hidden bg-muted/30">
                      {blog.cover_image ? (
                        <div className="w-full h-full relative">
                          <img 
                            src={blog.cover_image} 
                            alt={blog.title}
                            className="object-cover w-full h-full transition-transform duration-1000 group-hover/card:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                          <span className="text-primary/50 font-bold text-4xl opacity-20">AJPR</span>
                        </div>
                      )}
                      
                      {/* Floating Date Badge */}
                      <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 text-foreground/90 shadow-sm transition-transform duration-500 group-hover/card:scale-105 group-hover/card:border-primary/50">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>

                    <CardHeader className="pt-6 pb-3 relative z-10">
                      <h2 className="text-2xl font-bold tracking-tight line-clamp-2 leading-tight group-hover/card:text-primary transition-colors duration-500">
                        {blog.title}
                      </h2>
                    </CardHeader>
                    
                    <CardContent className="flex-grow relative z-10">
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">
                        {blog.excerpt}
                      </p>
                    </CardContent>

                    <CardFooter className="pt-0 pb-6 border-t border-white/5 mt-4 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                           {blog.author.charAt(0)}
                         </div>
                         <span className="text-xs font-semibold text-muted-foreground group-hover/card:text-foreground transition-colors duration-500">
                           {blog.author}
                         </span>
                      </div>
                      <div className="text-primary flex items-center text-sm font-semibold transform transition-all duration-500 opacity-0 -translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0">
                        Read Article <ArrowRightIcon className="w-4 h-4 ml-1 transform group-hover/card:translate-x-1 transition-transform" />
                      </div>
                    </CardFooter>

                  </Card>
                </Link>
              </MotionFadeItem>
            ))}
          </MotionStaggerContainer>
        )}
      </div>
    </div>
  );
}
