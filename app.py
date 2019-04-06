import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/nfldraft.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Nfl_Data = Base.classes.nfl_draft

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/team")
def team():
    return render_template("team.html")

@app.route("/overview")
def overview():
    return render_template("overview.html") 

@app.route("/position")
def position():
    return render_template("position.html") 

@app.route("/player")
def player():
    return render_template("player.html") 

@app.route("/names")
def names():
    """Return a list of sample names."""

    # Use Pandas to perform the sql query
    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    # Return a list of the column names (sample names)
    return jsonify(list(df.columns)[1:])

@app.route("/pos_names")
def pos_names():
    """Return a list of position names"""
    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    return jsonify(list(df["Pos_NFL"].unique()))

@app.route("/team_names")
def team_names():
    """Return a list of position names"""
    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    return jsonify(list(df["Team_Name"].unique()))

@app.route("/players_names")
def players_names():
    """Return a list of player names"""
    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    return jsonify(list(df["Player_Name"].unique()))

@app.route("/position_test/<pos>")
def position_test(pos):
    """Return Player Name, Position, Round, Yard_40, Bench_Press, Vert_Leap_in, Broad_Jump_in."""
    sel = [
        Nfl_Data.Player_Name, 
        Nfl_Data.Pos_NFL,
        Nfl_Data.Rnd,
        Nfl_Data.Yard_40,
        Nfl_Data.Bench_Press,
        Nfl_Data.Vert_Leap_in, 
        Nfl_Data.Broad_Jump_in,
    ]

    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    # Filter the data based on position

    results = db.session.query(*sel).filter(Nfl_Data.Pos_NFL==pos).all()
    
  
    pos_data = {"Player_Name":[], 
                "Pos_NFL":[],
                "Round":[], 
                "Yard_40":[], 
                "Bench_Press":[],
                "Vert_Leap_in":[], 
                "Broad_Jump_in":[],
    }
    for result in results:

        pos_data["Player_Name"].append(result[0])
        pos_data["Pos_NFL"].append(result[1])
        pos_data["Round"].append(result[2])
        pos_data["Yard_40"].append(result[3])
        pos_data["Bench_Press"].append(result[4])
        pos_data["Vert_Leap_in"].append(result[5])
        pos_data["Broad_Jump_in"].append(result[6])

    return jsonify(pos_data)

@app.route("/team_name/<team>")
def team_name(team):
    """Return Player Name, Position, Round, Pick, Team_Name, CollegeUniv, Combine."""
    sel = [
        Nfl_Data.Player_Name, 
        Nfl_Data.Pos_NFL,
        Nfl_Data.Rnd,
        Nfl_Data.Pick,
        Nfl_Data.Team_Name,
        Nfl_Data.CollegeUniv, 
        Nfl_Data.Combine,
    ]

    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    # Filter the data based on position

    results = db.session.query(*sel).filter(Nfl_Data.Team_Name==team).all()
    
  
    team_data = {"Player_Name":[], 
                "Pos_NFL":[],
                "Round":[], 
                "Pick":[], 
                "Team_Name":[],
                "CollegeUniv":[], 
                "Combine":[],
    }
    for result in results:

        team_data["Player_Name"].append(result[0])
        team_data["Pos_NFL"].append(result[1])
        team_data["Round"].append(result[2])
        team_data["Pick"].append(result[3])
        team_data["Team_Name"].append(result[4])
        team_data["CollegeUniv"].append(result[5])
        team_data["Combine"].append(result[6])


    return jsonify(team_data)

@app.route("/player_name/<player>")
def player_name(player):
    """Return Player Name, Position, Round, Pick, Team_Name, CollegeUniv, Combine."""
    sel = [
        Nfl_Data.Player_Name, 
        Nfl_Data.Pos_NFL,
        Nfl_Data.Team_Name,
        Nfl_Data.CollegeUniv,
        Nfl_Data.Rnd,
        Nfl_Data.Pick, 
        Nfl_Data.Yard_40,
		Nfl_Data.Bench_Press,
		Nfl_Data.Vert_Leap_in,
		Nfl_Data.Broad_Jump_in,
		Nfl_Data.Combine,
		Nfl_Data.Drafted,
		Nfl_Data.Averageof40_Yard,
		Nfl_Data.AverageofBench_Press,
		Nfl_Data.AverageofVert_Leap_in,	
		Nfl_Data.AverageofBroad_Jump_in,		
    ]

    stmt = db.session.query(Nfl_Data).statement
    df = pd.read_sql_query(stmt, db.session.bind)
    
    # Filter the data based on position

    results = db.session.query(*sel).filter(Nfl_Data.Player_Name==player).all()
    
  
    Player_data = {"Player_Name":[], 
                "Pos_NFL":[],
                "Team_Name":[],
				"CollegeUniv":[],
				"Rnd":[],
				"Pick":[],
				"Yard_40":[],
				"Bench_Press":[],
				"Vert_Leap_in":[],
                "Broad_Jump_in":[],
				"Combine":[],
				"Drafted":[],
				"Averageof40_Yard":[],
		        "AverageofBench_Press":[],
		        "AverageofVert_Leap_in":[],	
		       "AverageofBroad_Jump_in":[],
    }
    for result in results:

        Player_data["Player_Name"].append(result[0])
        Player_data["Pos_NFL"].append(result[1])
        Player_data["Team_Name"].append(result[2])
        Player_data["Rnd"].append(result[3])
        Player_data["Pick"].append(result[4])
        Player_data["Yard_40"].append(result[5])
        Player_data["Bench_Press"].append(result[6])
        Player_data["Vert_Leap_in"].append(result[7])
        Player_data["Broad_Jump_in"].append(result[8])
        Player_data["Combine"].append(result[9])
        Player_data["Drafted"].append(result[10])
        Player_data["Averageof40_Yard"].append(result[11])
        Player_data["AverageofVert_Leap_in"].append(result[12])
        Player_data["AverageofBroad_Jump_in"].append(result[13])
    
    return jsonify(Player_data)

if __name__ == "__main__":
    app.run()
