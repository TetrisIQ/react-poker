import CreateInstantRoomModal from "@/lib/component/CreateInstantRoomModal";
import { Card } from "flowbite-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-2/3">
      <h1 className="p-4 text-4xl dark:text-white">
        Smoother and Faster Scrum Poker Planning.
      </h1>
      <p className="py-4 text-xl dark:text-white">
        Plan and estimate your projects seamlessly with free Scrum poker rooms.
        No ads, no costs, just create an instant room and make your planning
        easier
      </p>
      <CreateInstantRoomModal />
      <div className="flex-row space-y-6">
        <Card
          imgSrc="/images/undraw/01undraw_preparation_re_t0ce.svg"
          className="card m-2 mr-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            1. Preparation
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            Before the Scrum Poker session, the product backlog should be ready,
            and user stories or tasks that need to be estimated are identified.
            These user stories should have been well-defined and broken down
            into smaller, manageable pieces.
          </p>
        </Card>
        <Card
          imgSrc="/images/undraw/02undraw_team_spirit_re_yl1v.svg"
          className="card m-2 ml-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            2. Team Setup
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            The Scrum team, including the Product Owner, Scrum Master, and
            development team members, gather for the estimation session. The
            ideal team size is usually between five to nine members to ensure
            effective collaboration.
          </p>
        </Card>
        <Card
          imgSrc="/images/undraw/03undraw_professor_re_mj1s.svg"
          className="card m-2 mr-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            3. Estimation Process
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            The Scrum Poker session typically starts with the Product Owner or
            Scrum Master presenting a user story or task that needs to be
            estimated. Each user story is discussed to ensure that all team
            members understand its requirements and scope.
          </p>
        </Card>
        <Card
          imgSrc="/favicon.png"
          className="card m-2 ml-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            4. Poddle Poker
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            To facilitate the estimation process, you can create a room and
            share the link with our team. If you have trouble to find a timeslot
            for your session. You can try out our Doodle alternative at{" "}
            <Link href="https://poddle.network" target="_blank">
              poddle.network
            </Link>
          </p>
        </Card>
        <Card
          imgSrc="/images/undraw/05undraw_election_day_w842.svg"
          className="card m-2 mr-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            5. Individual Estimation
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            Once the user story is understood, each team member privately
            selects a Planning Poker card representing their estimation of the
            effort required to complete the task. The results are hidden until
            the estimation round is complete.
          </p>
        </Card>
        <Card
          imgSrc="/images/undraw/06undraw_conversation_re_c26v.svg"
          className="card m-2 ml-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            6. Reveal and Discussion
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            After everyone has chosen a card, the results are displayed by a
            button click. If there is a consensus (i.e., all team members
            selected the same card), that becomes the final estimation.
          </p>
        </Card>
        <Card
          imgSrc="/images/undraw/07undraw_meeting_re_i53h.svg"
          className="card m-2 mr-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            7. Discussion of Divergent Estimations
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            If there is a wide range of estimations, the team engages in a
            discussion to understand the reasoning behind the various estimates.
            This discussion helps identify any misunderstandings, risks, or
            additional considerations related to the user story.
          </p>
        </Card>
        <Card
          imgSrc="/images/undraw/08undraw_voting_nvu7.svg"
          className="card m-2 ml-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            8. Re-Estimation (Optional)
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            Based on the discussion, team members may revise their initial
            estimations and select new cards. The process of discussion and
            re-estimation continues until a consensus is reached, or until the
            team decides to escalate the issue to the Product Owner for
            clarification.
          </p>
        </Card>
        <Card
          imgSrc="/images/undraw/09undraw_add_content_re_vgqa.svg"
          className="card m-2 mr-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            9. Recording the Estimations
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            The final estimation agreed upon by the team is recorded for the
            user story. It&aposs important to document these estimates for
            future reference, planning, and tracking progress.
          </p>
        </Card>
        <Card
          imgSrc="/images/undraw/10undraw_step_to_the_sun_nxqq.svg"
          className="card m-2 ml-auto text-left"
          horizontal
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            10. Next User Story
          </h5>
          <p className="mb-3 font-normal leading-tight text-gray-700 dark:text-gray-400">
            The process continues with the next user story or task in the
            backlog until all items are estimated.
          </p>
        </Card>
      </div>
    </div>
  );
}
