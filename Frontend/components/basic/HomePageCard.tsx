import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react";
import Link from "next/link"
import { LucideIcon } from "lucide-react";


interface HomePageCard {
    title: string;
    description: string;
    content: string;
    href: string;
    Icon?: LucideIcon;
  }

export default function HomePageCard ({title,description,content,href,Icon} : HomePageCard){
    return(
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
    <Link href={href} className="group transition-all duration-300 hover:scale-105 hover:-translate-y-1">
      <Card className="h-full transition-shadow duration-300 group-hover:shadow-xl">
        <CardHeader>
        {Icon && <Icon className="mb-2 h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />}
          <CardTitle className="transition-colors duration-300 group-hover:text-purple-600">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {content}
          </p>
        </CardContent>
      </Card>
    </Link>
    </motion.div>
    )
}