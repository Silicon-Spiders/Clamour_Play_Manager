<script>
    import { } from "os";
    
</script>

    <svelte:head>
        <title>Reviewer Account Creation</title>
    </svelte:head>

    <form>
        <table align="center" style="width: 90%;" >

            <colgroup>
                <col span="1" style="width: 30%;">
                <col span="1" style="width: 30%;">
                <col span="1" style="width: 30%;">
            </colgroup>

            <th align="left">
                <h4>Evaluator Account Creation</h4>
            </th>

            <tr>
                
                <td>
                    <label for="Last Name">Last Name:</label>
                    <input type="text" id="Last Name" name="Last Name" required>
                    <br>
                    <br>

                    <label for="First Name">First Name:</label>
                    <input type="text" id="First Name" name="First Name" required>
                    <br>
                    <br>

                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" required>
                    <small>Ex: 123-456-7890</small>
                    <br>
                    <br>

                    <label for="Email">Email:</label>
                    <input type="email" id="Email" name="Email" require>
                    <br>
                    <br>

                    <label for="uname">Username:</label>
                    <input type="text" id="uname" name="uname" required>
                    <br>
                    <br>

                    <label for="pword">Password:</label>
                    <input type="password" id="pword" name="pword" required>
                    <br>
                    <br>

                    <input type="submit" value="Create Account">

                </td>
            </tr> 
    </form>

    <style>

    </style>