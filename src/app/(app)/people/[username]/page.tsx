import ProfileHeader from "@/components/profile/ProfileHeader";
import ProjectCardRow from "@/components/profile/ProjectCardRow";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { communityPeople } from "@/components/profile/mock";

export default async function OtherUserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const profile =
    communityPeople.find((p) => p.username === username) ?? communityPeople[0];

  return (
    <div className="space-y-6">
      <ProfileHeader profile={profile} />

      <section className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur">
        <div className="text-sm font-semibold text-gray-900">Research overview</div>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">{profile.overview}</p>
      </section>

      <ProjectCardRow projects={profile.projects.filter((p) => p.status === "published")} />

      <ProfileTabs profile={profile} />
    </div>
  );
}
