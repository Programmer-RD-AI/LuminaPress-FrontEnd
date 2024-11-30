import posthog from "posthog-js";

posthog.init("phc_jPGCjEAAgJ6DdlNeuvZ7NivrJi3rWYV2vR3yjtejyor", {
  api_host: "https://us.i.posthog.com",
  person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
});
