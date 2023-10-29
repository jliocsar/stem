const page = await Bun.file('./dist/index.html').text()

export default {
  port: 3000,
  fetch(req: Request) {
    return new Response(page, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    })
  },
}
