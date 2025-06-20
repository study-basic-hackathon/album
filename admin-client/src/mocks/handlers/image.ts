import { http, HttpResponse } from "msw";
import { endpoint } from "../util";

let nextImageId = 1000;

export const image = [
  // POST /images
  http.post(endpoint("/images"), async () => {
    const id = (nextImageId++).toString();

    return new Response(null, {
      status: 201,
      headers: {
        Location: `/images/${id}`,
      },
    });
  }),

  // GET /images/{id}
  http.get(endpoint("/images/{imageId}"), ({ params }) => {
    const id = String(params.imageId);
    const ratios = [
      { width: 600, height: 600 },
      { width: 600, height: 800 },
      { width: 600, height: 450 },
      { width: 640, height: 360 },
      { width: 360, height: 640 },
    ];
    const colors = [
      "f9fafb", "fef3c7", "d1fae5", "e0f2fe",
      "fce7f3", "ede9fe", "fef2f2", "fff7ed",
    ];

    const ratioIndex = parseInt(id) % ratios.length;
    const colorIndex = parseInt(id) % colors.length;

    const { width, height } = ratios[ratioIndex];
    const bgColor = colors[colorIndex];
    const textColor = "333";

    const dummyUrl = `https://dummyimage.com/${width}x${height}/${bgColor}/${textColor}?text=Image+${id}`;
    return HttpResponse.redirect(dummyUrl, 302);
  })
];
