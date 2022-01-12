CHORD_DATA_MmAug = [{"label":"C_M","pcs":[0,4,7],"x":3,"y":4},
              {"label":"C_m","pcs":[0,3,7],"x":4,"y":3},
              {"label":"E_M","pcs":[4,8,11],"x":1,"y":2},
              {"label":"E_m","pcs":[4,7,11],"x":3,"y":2},
              {"label":"Gs_m","pcs":[8,11,3],"x":2,"y":1},
              {"label":"Gs_M","pcs":[8,0,3],"x":2,"y":3},

              {"label":"F_m","pcs":[5,8,0],"x":-3,"y":4},
              {"label":"F_M","pcs":[5,9,0],"x":-4,"y":3},
              {"label":"Cs_M","pcs":[1,5,8],"x":-3,"y":2},
              {"label":"Cs_m","pcs":[1,4,8],"x":-1,"y":2},
              {"label":"A_M","pcs":[9,1,4],"x":-2,"y":1},
              {"label":"A_m","pcs":[9,0,4],"x":-2,"y":3},

              {"label":"Bb_M","pcs":[10,2,5],"x":-3,"y":-4},
              {"label":"Bb_m","pcs":[10,1,5],"x":-4,"y":-3},
              {"label":"D_m","pcs":[2,5,9],"x":-3,"y":-2},
              {"label":"D_M","pcs":[2,6,9],"x":-1,"y":-2},
              {"label":"Fs_m","pcs":[6,9,1],"x":-2,"y":-1},
              {"label":"Fs_M","pcs":[6,10,1],"x":-2,"y":-3},

              {"label":"G_m","pcs":[7,10,2],"x":3,"y":-4},
              {"label":"G_M","pcs":[7,11,2],"x":4,"y":-3},
              {"label":"Eb_M","pcs":[3,7,10],"x":3,"y":-2},
              {"label":"Eb_m","pcs":[3,6,10],"x":1,"y":-2},
              {"label":"B_M","pcs":[11,3,6],"x":2,"y":-1},
              {"label":"B_m","pcs":[11,2,6],"x":2,"y":-3},


              {"label":"F_aug","pcs":[5,9,1],"x":-5,"y":0},
              {"label":"G_aug","pcs":[11,3,7],"x":5,"y":0},
              {"label":"C_aug","pcs":[8,0,4],"x":0,"y":5},
              {"label":"D_aug","pcs":[2,6,10],"x":0,"y":-5},
            ];

EDGE_DATA_MmAug = [{"pair":["C_M","C_aug"],"color":"black"},
                   {"pair":["E_M","C_aug"],"color":"black"},
                   {"pair":["Gs_M","C_aug"],"color":"black"},
                   {"pair":["F_m","C_aug"],"color":"black"},
                   {"pair":["A_m","C_aug"],"color":"black"},
                   {"pair":["Cs_m","C_aug"],"color":"black"},

                   {"pair":["C_m","G_aug"],"color":"black"},
                   {"pair":["E_m","G_aug"],"color":"black"},
                   {"pair":["Gs_m","G_aug"],"color":"black"},
                   {"pair":["G_M","G_aug"],"color":"black"},
                   {"pair":["B_M","G_aug"],"color":"black"},
                   {"pair":["Eb_M","G_aug"],"color":"black"},

                   {"pair":["D_M","D_aug"],"color":"black"},
                   {"pair":["Fs_M","D_aug"],"color":"black"},
                   {"pair":["Bb_M","D_aug"],"color":"black"},
                   {"pair":["G_m","D_aug"],"color":"black"},
                   {"pair":["B_m","D_aug"],"color":"black"},
                   {"pair":["Eb_m","D_aug"],"color":"black"},

                   {"pair":["D_m","F_aug"],"color":"black"},
                   {"pair":["Fs_m","F_aug"],"color":"black"},
                   {"pair":["Bb_m","F_aug"],"color":"black"},
                   {"pair":["F_M","F_aug"],"color":"black"},
                   {"pair":["A_M","F_aug"],"color":"black"},
                   {"pair":["Cs_M","F_aug"],"color":"black"},

                   {"pair":["C_M","C_m"],"color":"darkorange"},
                   {"pair":["Cs_M","Cs_m"],"color":"darkorange"},
                   {"pair":["D_M","D_m"],"color":"darkorange"},
                   {"pair":["Eb_M","Eb_m"],"color":"darkorange"},
                   {"pair":["E_M","E_m"],"color":"darkorange"},
                   {"pair":["F_M","F_m"],"color":"darkorange"},
                   {"pair":["Fs_M","Fs_m"],"color":"darkorange"},
                   {"pair":["G_M","G_m"],"color":"darkorange"},
                   {"pair":["Gs_M","Gs_m"],"color":"darkorange"},
                   {"pair":["A_M","A_m"],"color":"darkorange"},
                   {"pair":["Bb_M","Bb_m"],"color":"darkorange"},
                   {"pair":["B_M","B_m"],"color":"darkorange"},

                   {"pair":["C_M","E_m"],"color":"forestgreen"},
                   {"pair":["Cs_M","F_m"],"color":"forestgreen"},
                   {"pair":["D_M","Fs_m"],"color":"forestgreen"},
                   {"pair":["Eb_M","G_m"],"color":"forestgreen"},
                   {"pair":["E_M","Gs_m"],"color":"forestgreen"},
                   {"pair":["F_M","A_m"],"color":"forestgreen"},
                   {"pair":["Fs_M","Bb_m"],"color":"forestgreen"},
                   {"pair":["G_M","B_m"],"color":"forestgreen"},
                   {"pair":["Gs_M","C_m"],"color":"forestgreen"},
                   {"pair":["A_M","Cs_m"],"color":"forestgreen"},
                   {"pair":["Bb_M","D_m"],"color":"forestgreen"},
                   {"pair":["B_M","Eb_m"],"color":"forestgreen"},
                  ];
var SHIFT_KEY=0;
d3.select("body")
.on("keydown", function() {
                if (d3.event.keyCode==18) {
                    SHIFT_KEY = 1;
                } })
.on("keyup",function() {SHIFT_KEY=0;})

SVG_WIDTH=600;
SVG_HEIGHT=700;
SVG_left_cubedance = d3.select("#left_cubedance").attr("width", "80%").attr("height", "100%");

var data_selection = SVG_left_cubedance.selectAll("line").data(EDGE_DATA_MmAug, function(d) {return d.pair;});

var synth = JZZ.synth.Tiny()

data_selection.enter()
   .append("line")
   .attr("opacity",0.5)
   .attr("x1",function (d) {
                data = find_chord_data(d.pair[0]);
                return SVG_WIDTH/2+50*data.x;
              })
   .attr("y1",function (d) {
                data = find_chord_data(d.pair[0]);
                return SVG_HEIGHT/2-50*data.y;
              })
   .attr("x2",function (d) {
                data = find_chord_data(d.pair[1]);
                return SVG_WIDTH/2+50*data.x;
              })
   .attr("y2",function (d) {
                data = find_chord_data(d.pair[1]);
                return SVG_HEIGHT/2-50*data.y;
              })
   .attr("stroke",function(d) {return d.color;})
   .attr("stroke-width",2);


var data_selection = SVG_left_cubedance.selectAll(".chordNode").data(CHORD_DATA_MmAug, function(d) {return d.label;});

  gElems = data_selection.enter()
     .append("g")
     .on("mouseover",function(d){
       var the_label = d.label;
       if (SHIFT_KEY==1) {
         d3.select(this).select("circle").attr("fill","coral");
       } else {
         d3.select(this).select("circle").attr("fill","white");
       }
      if (SELECTED_AUTOMORPHISM_IDX!=null) {
         img_label = ALL_AUTS[SELECTED_AUTOMORPHISM_IDX]["chord_mapping"][the_label];
         d3.select(this).select("circle").attr("stroke","lightblue");
         d3.select("#left_"+img_label).select("circle").attr("fill","lavender");
       }
     })
     .on("mouseleave",function(d){
       var the_label = d.label;
       if (SELECTED_AUTOMORPHISM_IDX!=null) {
         img_label = ALL_AUTS[SELECTED_AUTOMORPHISM_IDX]["chord_mapping"][the_label];
         d3.select(this).select("circle").attr("stroke","lightgray");
         d3.select("#left_"+img_label).select("circle").attr("fill","white");
       }
        d3.select(this).select("circle").attr("fill","white");
        for(pitch of d.pcs){
          synth.send(JZZ.MIDI.noteOff(0, 60+pitch))
         }
     })
     .on("click",function(d) {
       if (SHIFT_KEY==1) {
         CURRENT_CHORD_PROGRESSION.push(d.label);
         update_chord_progression_display();
       }
       
     })
     .on("mousedown",function(d) {
      for(pitch of d.pcs){
        synth.send(JZZ.MIDI.noteOn(0, 60+pitch, 80))
       }
     })
     .on("mouseup",function(d) {
       for(pitch of d.pcs){
        synth.send(JZZ.MIDI.noteOff(0, 60+pitch))
       }
     })
     .attr("id",function (d) {return "left_"+d.label})
      .attr("transform",function(d){
            var pos_x = SVG_WIDTH/2+50*d.x;
            var pos_y = SVG_HEIGHT/2-50*d.y;
            return "translate("+pos_x.toString()+" "+pos_y.toString()+")"})
    ;

  gElems.append("circle")
  .attr("class","chordNodeCircle")
     .attr("r",18)
     .attr("stroke","lightgray")
     .attr("fill","white")
     .attr("opacity",1.0);

  gElems.append("text")
   .attr("class","chordNodeText")
   .attr("x",0.0)
   .attr("y",4)
   .html(function (d) {return format_chord_string(d.label).replace("<sub>",'<tspan dy="8" style="font-size:10px;">').replace("</sub>","</tspan>")});

SVG_left_cubedance.append("line")
                  .attr("x1",10)
                  .attr("x2",40)
                  .attr("y1",10)
                  .attr("y2",10)
                  .attr("stroke","black");
SVG_left_cubedance.append("text")
                  .attr("x",45)
                  .attr("y",15)
                  .attr("fill","black").html("U");
SVG_left_cubedance.append("line")
                  .attr("x1",10)
                  .attr("x2",40)
                  .attr("y1",30)
                  .attr("y2",30)
                  .attr("stroke","forestgreen");
SVG_left_cubedance.append("text")
                  .attr("x",45)
                  .attr("y",35)
                  .attr("fill","forestgreen").html("L");
SVG_left_cubedance.append("line")
                  .attr("x1",10)
                  .attr("x2",40)
                  .attr("y1",50)
                  .attr("y2",50)
                  .attr("stroke","darkorange");
SVG_left_cubedance.append("text")
                  .attr("x",45)
                  .attr("y",55)
                  .attr("fill","darkorange").html("P");

function find_chord_data(chord_label){
  for (var i=0;i<CHORD_DATA_MmAug.length;i++) {
    if (CHORD_DATA_MmAug[i]["label"]==chord_label) {
      return {"x":CHORD_DATA_MmAug[i]["x"],"y":CHORD_DATA_MmAug[i]["y"],"pcs":CHORD_DATA_MmAug[i]["pcs"]}
    }
  }
}

function toggle_progression(prog,toggle) {
  for (var i=0;i<prog.length;i++) {
    if(toggle==1) {
      d3.select("#left_"+prog[i]).select("circle").attr("fill","limegreen");
    } else {
      d3.select("#left_"+prog[i]).select("circle").attr("fill","white");
    }
  }
}
