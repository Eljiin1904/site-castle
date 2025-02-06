import { Site } from "@core/services/site";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ActivityCard, ActivityCardPlaceholder } from "./ActivityCard";
import { ActivityManager } from "./ActivityManager";
import "./ActivityFeed.scss";

export const ActivityFeed = () => {
  const activity = useAppSelector((x) => x.site.activity);

  return (
    <Div
      className="ActivityFeed"
      fx
      gap={12}
      overflow="hidden"
    >
      <ActivityManager />
      {activity
        ? activity.map((x) => (
            <ActivityCard
              key={x._id}
              activity={x}
              inserted={x.inserted}
              animate
            />
          ))
        : [...Array(Site.activityLogSize)].map((x, i) => (
            <ActivityCardPlaceholder key={i} />
          ))}
    </Div>
  );
};
