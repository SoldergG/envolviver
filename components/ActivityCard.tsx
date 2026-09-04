import Image from "next/image";
import Link from "next/link";
import type { Activity } from "@/lib/content";
import { accentVars } from "@/lib/color";
import { Arrow } from "./Arrow";

export function ActivityCard({
  activity,
  base,
}: {
  activity: Activity;
  base: string;
}) {
  return (
    <Link href={`${base}/${activity.slug}`} className="card group flex flex-col">
      {/* As fotos de origem são pequenas (290×208), por isso o cartão
          mantém-as num rácio contido em vez de as esticar. */}
      <div className="relative aspect-[290/208] overflow-hidden surface-2">
        <Image
          src={activity.photo}
          alt=""
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 340px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
        />
        <span
          className="accent absolute inset-x-0 bottom-0 h-1"
          style={accentVars(activity.color)}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-title">{activity.name}</h3>
        <p className="muted pretty mt-2 flex-1 text-[0.9375rem] leading-relaxed">
          {activity.summary}
        </p>
        <span className="link-arrow mt-5 text-[0.9375rem]">
          Saber mais <Arrow />
        </span>
      </div>
    </Link>
  );
}
