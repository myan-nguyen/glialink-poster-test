import ProfileHeader from "@/components/profile/ProfileHeader";
import ProjectCardRow from "@/components/profile/ProjectCardRow";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { myProfile } from "@/components/profile/mock";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader profile={myProfile} />

      <section className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm font-semibold text-gray-900">Research overview</div>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">{myProfile.overview}</p>
      </section>

      <ProjectCardRow projects={myProfile.projects.filter((p) => p.status === "published")} />

      <ProfileTabs profile={myProfile} />
    </div>
  );
}
