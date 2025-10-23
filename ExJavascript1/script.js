 const reponses = {
      q1: ['b'],              
      q2: ['b'],              
      q3: ['a', 'c'],         
      q4: ['a', 'c'],         
      q5: ['a']               
    };

    // Réinitialiser le QCM
    function initialiserQCM() {
      document.getElementById('qcmForm').reset();
    }

    // Afficher les réponses correctes dans une nouvelle fenêtre
    function afficherCorrections() {
      let nouvelleFenetre = window.open("", "corrections", "width=600,height=600");
      nouvelleFenetre.document.write("<h2>Corrigé du QCM</h2>");
      nouvelleFenetre.document.write("<ul>");

      for (let [q, bonnesReponses] of Object.entries(reponses)) {
        nouvelleFenetre.document.write(`<li><b>${q.toUpperCase()}</b> : `);
        nouvelleFenetre.document.write(
          bonnesReponses.map(r => `<span style='color:green; text-decoration:underline'>${r}</span>`).join(', ')
        );
        nouvelleFenetre.document.write("</li>");
      }
      nouvelleFenetre.document.write("</ul>");
      nouvelleFenetre.document.close();
    }

    // Afficher le résultat du test
    function afficherResultat() {
      let score = 0;
      let resultatTexte = "";

      for (let [q, bonnesReponses] of Object.entries(reponses)) {
        const elements = document.querySelectorAll(`[name=${q}]`);
        let reponsesUtilisateur = [];

        elements.forEach(el => {
          if (el.checked) reponsesUtilisateur.push(el.value);
        });

        let correcte = JSON.stringify(bonnesReponses.sort()) === JSON.stringify(reponsesUtilisateur.sort());
        resultatTexte += `<p>La réponse à la question ${q.substring(1)} est ${correcte ? "<span style='color:green'>correcte</span>" : "<span style='color:red'>incorrecte</span>"}.</p>`;
        if (correcte) score++;
      }

      let nouvelleFenetre = window.open("", "resultat", "width=400,height=400");
      nouvelleFenetre.document.write("<h2>Résultat du QCM</h2>");
      nouvelleFenetre.document.write(resultatTexte);
      nouvelleFenetre.document.write(`<h3>Score final : ${score}/5</h3>`);
      nouvelleFenetre.document.close();
    }