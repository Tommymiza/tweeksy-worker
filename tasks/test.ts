import { Task } from "graphile-worker";

export const testJob: Task = async (payload: unknown, helpers) => {
  try {
    helpers.logger.info(
      "Generating data with payload: " + JSON.stringify(payload),
    );
  } catch (error) {
    throw error;
  }
};
