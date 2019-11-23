let spinLeft = 1;
  let reqEmail = false;
  const $spinLeft = $("#spin_left");
  const $canvasInfo = $("#canvas_info");
  const $voucherContainer = $("#voucher_container");
  const $emailForm = $("#form_email");
  const $errorForm = $("#form_error");
  const $thankYou = $("#thank_you");
  const vouchers = [];
  let email = null;

  const sketch = function(p) {
    const sections = [
      {
        value: 100000,
        color: "yellow"
      },
      {
        value: 20000,
        color: "#d0efff"
      },
      {
        value: 10000,
        color: "#2a9df4"
      },
      {
        value: 20000,
        color: "#d0efff"
      },
      {
        value: 10000,
        color: "#2a9df4"
      },
      {
        value: 20000,
        color: "#d0efff"
      },
      {
        value: 10000,
        color: "#2a9df4"
      },
      {
        value: 20000,
        color: "#d0efff"
      },
      {
        value: 10000,
        color: "#2a9df4"
      },
      {
        value: 20000,
        color: "#d0efff"
      }
    ];

    $emailForm.submit(async function(e) {
      e.preventDefault();
      email = $emailForm.find("input").val();
      try {
        const response = await axios.post("/api/user", { email });
        $emailForm.hide("fast");
        spinLeft = 2;
        $spinLeft.text(spinLeft);
        console.log({ response });

        const response1 = await axios.post(`/api/voucher/user/${email}`, {
          vouchers: vouchers.slice(0, 1)
        });
        console.log({ response1 });
      } catch (error) {
        $errorForm.text(error.response.data.errors[0].msg);
        console.log({ error });
      }
    });

    let counter = 9999999;
    let maxCounter = 200 + Math.floor(Math.random() * 300);
    let rotateRad = 0;
    let rotateSpeedRad = 0;
    let rotateSpeedAccRad = 0.002;
    const oneArcSize = (2 * p.PI) / sections.length;
    let spinTextCounter = 0;
    let done = true;

    p.setup = function() {
      console.log("setup");
      p.createCanvas(300, 300);
      p.smooth();

      console.log("setup");
      $('#canvas_container p').hide(0, function() {
        console.log('p hidden');
      });

      $("#canvas_container canvas").click(function() {
        if (counter > maxCounter && done && spinLeft > 0) {
          $canvasInfo.html(``);
          spinLeft -= 1;
          $spinLeft.text(spinLeft);
          maxCounter = 200 + Math.floor(Math.random() * 300);
          counter = 0;
          done = false;
          $errorForm.text("");
        }
      });
    };

    p.draw = function() {
      // after spin
      if (counter > maxCounter && !done) {
        console.log({ rotateSpeedRad });
        done = true;
        let chosenIndex =
          Math.floor((rotateRad + oneArcSize / 2) / oneArcSize) %
          sections.length;
        $canvasInfo.html(
          `<strong>You got Rp. ${sections[chosenIndex].value} worth of redeemable voucher!</strong>`
        );
        $voucherContainer.append(`
          <span class="voucher">
            Rp. ${sections[chosenIndex].value / 1000}.000
          </span>
        `);
        vouchers.push(sections[chosenIndex]);
        if (spinLeft === 0 && reqEmail && done) {
          $thankYou.fadeIn("fast");
        }
        if (spinLeft === 0 && !reqEmail && done) {
          reqEmail = true;
          $emailForm.fadeIn("fast");
        }
        if (reqEmail) {
          axios
            .post(`/api/voucher/user/${email}`, {
              vouchers: vouchers.slice(-1, vouchers.length)
            })
            .then(response => console.log({ response1 }))
            .catch(error => console.log({ error }));
        }
      }
      if (counter < maxCounter / 2) rotateSpeedRad += rotateSpeedAccRad;
      else rotateSpeedRad = Math.max(0, rotateSpeedRad - rotateSpeedAccRad);
      counter += 1;
      rotateRad = (rotateRad + rotateSpeedRad) % (2 * p.PI);

      p.smooth();
      p.translate(150, 150);

      p.push();
      p.rotate(-p.HALF_PI - oneArcSize / 2);
      p.rotate(rotateRad);
      p.stroke(p.color("gold"));
      p.strokeWeight(8);

      for (let i = 0; i < sections.length; i++) {
        p.fill(p.color(sections[i].color));
        p.arc(0, 0, 290, 290, i * oneArcSize, (i + 1) * oneArcSize);
        p.push();
        p.rotate(i * oneArcSize + +oneArcSize / 2);
        p.textAlign(p.RIGHT, p.CENTER);
        if (sections[i].value === 100000) p.fill(p.color("black"));
        else p.fill(p.color("white"));
        p.strokeWeight(3);
        p.stroke(p.color("darkgray"));
        p.text(`${sections[i].value / 1000} K`, 115, 0);
        p.pop();
      }

      p.pop();

      // spin text
      p.textStyle(p.BOLD);
      p.textSize(20);
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(p.color("cornflowerblue"));
      p.stroke(p.color("gold"));
      p.strokeWeight(4);
      p.ellipse(0, 0, 70, 70);
      p.fill(p.color("white"));
      p.noStroke();
      spinTextCounter = (spinTextCounter + 1) % 20;
      if (!done || spinLeft === 0) p.fill(p.color("darkgray"));
      else if (spinTextCounter < 10) p.fill(p.color("black"));
      else p.fill(p.color("white"));
      p.text("SPIN", 0, 0);

      // triangle
      p.fill(p.color("black"));
      p.triangle(-15, -160, 15, -160, 0, -130);
    };
  };
  new p5(sketch, window.document.getElementById("canvas_container"));