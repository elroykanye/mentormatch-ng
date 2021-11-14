/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const MENTOR_MATCH_API: string = "https://mentors-match.herokuapp.com/api";
export const MENTOR: string = "mentor";
export const MENTEE: string = "mentee";
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// mentee endpoints
export const MENTEE_ENDPOINT: string = MENTOR_MATCH_API.concat("/mentee");
export const MENTEE_ENDPOINT_ADD: string = MENTEE_ENDPOINT;
export const MENTEE_ENDPOINT_ALL: string = MENTEE_ENDPOINT;
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// mentor endpoints
export const MENTOR_ENDPOINT: string = MENTOR_MATCH_API.concat("/mentor");
export const MENTOR_ENDPOINT_ADD: string = MENTOR_ENDPOINT;
export const MENTOR_ENDPOINT_ALL: string = MENTOR_ENDPOINT;
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// match endpoints
export const MATCH_ENDPOINT: string = MENTOR_MATCH_API.concat("/match");
export const MATCH_ENDPOINT_ALL: string = MATCH_ENDPOINT;
export const MATCH_SHUFFLE_ENDPOINT: string = MATCH_ENDPOINT.concat("/shuffle");
export const MATCH_MENTOR_BY_MENTEE_ENDPOINT: string = MATCH_ENDPOINT.concat("/mentor")

export function getMatchAllMenteesByMentorEndpointGen(mentorId: number) {
  return MATCH_ENDPOINT.concat(mentorId.toString()).concat("mentees")
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CMR_CODE: string = "+237";
export const WA_PREFIX: string = "https://wa.me/";
/////////////////////////////////////////////////////////////////////////////////////////////////////////



